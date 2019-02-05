import './header.scss';
import '../button/button';

import { isTouchDevice } from '../../main';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const btn = document.querySelector('.header__button');

btn.onclick = () => {
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: document.querySelector('.order').offsetTop - 40
	});
}

const fullpage = document.querySelector('.fullpage');

fullpage.style.height = `${window.innerHeight}px`;

window.addEventListener('resize', () => {
	if (!isTouchDevice) {
		fullpage.style.height = `${window.innerHeight}px`;
	}
});
