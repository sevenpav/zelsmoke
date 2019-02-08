import './header.scss';
import '../button/button';

import { fullpage } from '../../main';

fullpage();

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

