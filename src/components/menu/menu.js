import './menu.scss';
import './hamburger.scss';

import '../logo/logo';

const body = document.querySelector('body');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', e => {

	e.currentTarget.classList.toggle('hamburger--collapse');
	menu.classList.toggle('menu--collapse');
	body.classList.toggle('fixed');

	if (menu.classList.contains('menu--collapse')) {
		menu.style.height = `${window.innerHeight}px`;
	} else {
		menu.style.height = null;
	}
});

window.addEventListener('resize', () => {
	hamburger.classList.remove('hamburger--collapse');
	menu.classList.remove('menu--collapse');
	body.classList.remove('fixed');
	menu.style.height = null;
});