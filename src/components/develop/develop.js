import './develop.scss';
import './../logo/logo'
import './../button/button'

const fullpage = document.querySelector('.fullpage');

fullpage.style.height = `${window.innerHeight}px`;

window.addEventListener('resize', () => {
	const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	if (!isTouchDevice) {
		fullpage.style.height = `${window.innerHeight}px`;
	}
});