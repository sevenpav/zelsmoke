import './order.scss';
import '../form/form';

import { handlerClickItem } from './js/handlers/click-item';
import { handlerClickBtnAdd } from './js/handlers/click-add';

import sliderInit from './js/slider';
import { total } from './js/total-utils';

sliderInit(document.querySelectorAll('.order__list'));

window.addEventListener('resize', () => {

	const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
	const orderLists = document.querySelectorAll('.order__list');

	if (!isTouchDevice) {
		orderLists.forEach(el => {
			el.style.transform = null;
		});
	}
});

const bowlItemNodes = document.getElementById('bowl').querySelectorAll('.order__item');
handlerClickItem(bowlItemNodes, total.bowls[0], total);


const fillerItemNodes = document.getElementById('filler').querySelectorAll('.order__item');
handlerClickItem(fillerItemNodes, total.bowls[0], total);


const btnAddNode = document.querySelector('.order__btn-add');
btnAddNode.addEventListener('click', handlerClickBtnAdd(btnAddNode, total));



