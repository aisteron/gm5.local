import {ui} from './ui.js'
import {About} from './pages/about.js'

import '../sass/index.sass';

document.readyState !== 'loading' ? init() : document.addEventListener('DOMContentLoaded', init);
function init(){
	ui()
	About()
}

