import {
	$_,
	$$_,
	loadCSS,
	onloadCSS,
	load_swiper,
	init_swiper,
	load_notification,
	show_notification,
} from "./libs.js";

export function ui() {
	nav_drop_down();
	load_swiper_on_index_page();

	send_app();
	menu_icon_open();
	mobile_menu_dropdown();

	popup_courses()
	popup_course()
	popup_submit()
}

function nav_drop_down() {
	$$_("nav ul li.expand").forEach((li) => {
		li.addEventListener("click", (event) => {
			event.stopPropagation();
			event.target.closest("li").classList.toggle("open");
		});
	});

	window.addEventListener("click", (event) => {
		let is_menu = event.target == $_("nav ul li.expand");
		let is_contains = $_("nav ul li.expand").contains(event.target);
		if (!is_menu || !is_contains) {
			$$_("nav ul li.expand").forEach((el) => el.classList.remove("open"));
		}
	});
}

function load_swiper_on_index_page() {
	if ($_("body").classList.contains("index-page")) {
		load_swiper()
			.then((r) => init_swiper($_(".getting-started .swiper")))
			.then(r => {
				
				let sw = Number(r.width);
				let scw = Number($_(".scales").offsetWidth);
				let ml = getComputedStyle($_(".swiper"));
				ml = Number(ml.marginLeft.split("px")[0]);

				let final = sw / 2 + ml / 1.2 + scw;

				if (window.innerWidth < 1000) final = final / 2;


				$_(".swiper-pagination").style.marginLeft = final + "px";

				if (window.innerWidth < 500) $_(".swiper-pagination").style.marginLeft = 50 + "%";
			
				const swiper = new Swiper(".carousel .swiper", {
					effect: "cards",
					grabCursor: true,
				});


			});

	}
}


function send_app() {
	if (!$_("aside .form form")) return;

	$_("aside .form form").addEventListener("submit", (event) => {
		event.preventDefault();

		let data = {
			name: $_("aside .form form input#name").value,
			phone: $_("aside .form form input#phone").value,
		};

		$_("aside .form form #wa").checked ? (data.wa = true) : null;
		$_("aside .form form #tg").checked ? (data.tg = true) : null;

		let path = "";
		process.env.NODE_ENV == "development"
			? (path = "/api/receive/form")
			: (path = "/api/receive/form");

		fetch(path, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data),
		})
			.then((r) => r.json())
			.then((j) => {
				if (j.success) {
					load_notification().then((r) =>
						show_notification("Отправлено", "success")
					);
					$_("aside .form form input#name").value = "";
					$_("aside .form form input#phone").value = "";
					$$_('aside .form form input[type="checkbox"]').forEach(
						(el) => (el.checked = false)
					);
				}
			});
	});
}

function menu_icon_open() {
	$_("button.hamburger").addEventListener("click", (event) => {
		event.target.classList.toggle("is-active");
		$_(".mobile_menu_wrapper").classList.toggle("open");
	});
}

function mobile_menu_dropdown() {
	$$_(".mobile_menu_wrapper ul li.expand").forEach((li) => {
		li.addEventListener("click", (event) => {
			event.stopPropagation();
			event.target.closest("li").classList.toggle("open");
		});
	});
}



function popup_courses(){
	if(!$_('#popup_wrap')) return
	
	$$_('.item button.common').forEach(el => {
		
		el.addEventListener('click', event => {
			
			let title = event.target.closest('.item').querySelector('h3').innerText
			
			$_('#popup_wrap').style.display = "block"
			
			setTimeout(_=> $_('#popup_wrap').classList.add('open'), 100)

			$_('#popup input[disabled]').value = title

			
		})
	})

	document.addEventListener('keydown', event => {
		if (event.key == "Escape" && $_('#popup_wrap').classList.contains("open")){

			$_('#popup_wrap').classList.remove('open')
			setTimeout(_=> $_('#popup_wrap').classList.style.display = "none", 100)
			$_('#popup input[disabled]').value = ""
		}
	})

	document.addEventListener('click', event => {
		
		if(event.target == $_('#popup_wrap'))	{
			$_('#popup_wrap').classList.remove('open')
			$_('#popup input[disabled]').value = ""
		}
	})

	$_('#popup span.close').addEventListener('click', event => {
			$_('#popup_wrap').classList.remove('open')
			$_('#popup input[disabled]').value = ""
	})
	
}

function popup_course(){

	if(!$_('#popup_wrap')) return
	

		
		$_('article button.common').addEventListener('click', event => {

			
			let title = $_('h1').innerText
			
			$_('#popup_wrap').style.display = "block"
			
			setTimeout(_=> $_('#popup_wrap').classList.add('open'), 100)

			$_('#popup input[disabled]').value = title

			
		})


	document.addEventListener('keydown', event => {
		if (event.key == "Escape" && $_('#popup_wrap').classList.contains("open")){

			$_('#popup_wrap').classList.remove('open')
			setTimeout(_=> $_('#popup_wrap').classList.style.display = "none", 100)
			$_('#popup input[disabled]').value = ""
		}
	})

	document.addEventListener('click', event => {
		
		if(event.target == $_('#popup_wrap'))	{
			$_('#popup_wrap').classList.remove('open')
			$_('#popup input[disabled]').value = ""
		}
	})

	$_('#popup span.close').addEventListener('click', event => {
			$_('#popup_wrap').classList.remove('open')
			$_('#popup input[disabled]').value = ""
	})
	
}


function popup_submit(){
	$_('#popup form').addEventListener('submit', event => {
		event.preventDefault()

		var select = $_('#popup select')
		var size = select.options[select.selectedIndex].innerText;


		let data = {
			title: $_('#popup input[disabled]').value,
			name: $_('#p_name').value,
			phone: $_('#p_phone').value,
			size: size
		}

		let path = '/api/receive/form2'
		
		fetch(path,{
			method: "POST",
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify(data)
		})
			.then(r=>r.json())
			.then(j => {
				if(j.success){
					load_notification().then((r) =>
						show_notification("Отправлено", "success")
					);

					$_('#p_name').value = ""
					$_('#p_phone').value = ""

					setTimeout(_=>{
						$_('#popup_wrap').classList.remove('open')
						$_('#popup input[disabled]').value = ""
					}, 3000)
				}
			})
	})
}