import "regenerator-runtime/runtime.js";

export function $_(element) {return document.querySelector(element)}
export function $$_(elements) {return document.querySelectorAll(elements)}


export function loadCSS(n,e,o,d){"use strict";var t=window.document.createElement("link"),i=e||window.document.getElementsByTagName("script")[0],l=window.document.styleSheets;return t.rel="stylesheet",t.href=n,t.media="only x",d&&(t.onload=d),i.parentNode.insertBefore(t,i),t.onloadcssdefined=function(n){for(var e,o=0;o<l.length;o++)l[o].href&&l[o].href===t.href&&(e=!0);e?n():setTimeout(function(){t.onloadcssdefined(n)})},t.onloadcssdefined(function(){t.media=o||"all"}),t}

export function onloadCSS(n,e){
	n.onload=function(){
		n.onload=null,e&&e.call(n)
	},"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(e);
}

export async function load_swiper(){
	return new Promise(resolve => {

		let script = document.createElement('script')
		script.src = "/vendors/swiper/swiper-bundle.min.js"
		$_('.scripts-area').appendChild(script)

		script.onload = () => {
			let style = loadCSS('/vendors/swiper/swiper-bundle.min.css')
			onloadCSS(style, _ => {
				resolve('resources loaded')
			})
		}

	})
}
export function init_swiper(el){

	const swiper = new Swiper(el, { pagination: { el: '.swiper-pagination', clickable: true}
	});
	return swiper;
}