import '../logo/logo';
import './menu.scss';
import './hamburger.scss';

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');

hamburger.addEventListener('click', (e) => {
	e.currentTarget.classList.toggle('hamburger--collapse');
	menu.classList.toggle('menu--collapse');
	body.classList.toggle('fixed');
	const menuCollapse = document.querySelector('.menu--collapse');

	if (menuCollapse) {
		menuCollapse.style.height = `${window.innerHeight}px`;
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