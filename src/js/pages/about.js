import {
	$_,
	$$_,
	loadCSS,
	onloadCSS,
	load_swiper,
	init_swiper,
} from "../libs.js";


export function About(){
	load_fancy()
	load_swiper()
	 .then(_ => {
	 	init_swiper($_('.testimonials .swiper'))
	 	init_swiper($_('.gallery .swiper'))
	 })
}

async function load_fancy(){
	
	return new Promise(resolve => {
	
	if($_('.fancy')) resolve('fancy container not found 404');
	
	let script = document.createElement('script');
		script.src="/vendors/fancy/fancybox.umd.js"
		$_('.scripts-area').appendChild(script)
		script.onload = () => {
			let style = loadCSS('/vendors/fancy/fancybox.css')
			onloadCSS(style, _ => resolve('fancy assets loaded'))
		}
	
	})

	
}