import './big-header.scss';
import '../button/button';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const headerBtn = document.querySelector('.header__button');

headerBtn.onclick = () => {
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: document.querySelector('.order').offsetTop - 40
	});
};

const fullpage = document.querySelector('.fullpage');

fullpage.style.height = `${window.innerHeight}px`;

window.addEventListener('resize', () => {
	const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	if (!isTouchDevice) {
		fullpage.style.height = `${window.innerHeight}px`;
	}
});