import {$_, $$_, loadCSS, onloadCSS, load_swiper, init_swiper} from './libs.js';

export function ui(){
	nav_drop_down()
	load_swiper_on_index_page()
}

function nav_drop_down(){

	$$_('nav ul li.expand').forEach(li => {
		
		li.addEventListener('click', event => {
			event.stopPropagation();
			event.target.closest('li').classList.toggle('open')
		})
	})

	window.addEventListener('click', event => {
		let is_menu = event.target == $_('nav ul li.expand')
		let is_contains = $_('nav ul li.expand').contains(event.target)
		if(!is_menu || !is_contains){
			$$_('nav ul li.expand').forEach(el=>el.classList.remove('open'))
		}
		
	})

}

function load_swiper_on_index_page(){
	
	if($_('body').classList.contains('index-page')){
		$_('.bottom.lazyload').addEventListener('lazyloaded', _ => {
			load_swiper()
			.then(r => init_swiper($_('.getting-started .swiper')))
			.then(r => {
				let sw = Number(r.width)
				let scw = Number($_('.scales').offsetWidth)
				let ml = getComputedStyle($_('.swiper'));
				ml = Number(ml.marginLeft.split('px')[0])

				console.log(sw/2+ml+scw)
		
				//console.log()
				//console.log(scw)

				$_('.swiper-pagination').style.marginLeft = sw/2 + ml/1.2 + scw + 'px'

			})
		})
	}
}

