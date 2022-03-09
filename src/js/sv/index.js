import './1.sass'
import App from './1.svelte';

const app = new App({
	target: document.querySelector('#root'),
	props: {
		name: 'world'
	}
});

export default app;