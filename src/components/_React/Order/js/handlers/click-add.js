import { getNewChoiceWrapNode } from '../node-creator';
import { addBowlToTotal, createNewBowl } from '../total-utils'
import sliderInit from '../../slider';
import { handlerClickBtnClose } from './click-close';
import { handlerClickItem } from './click-item';

export const handlerClickBtnAdd = (btnAddNode, total) => () => {

	btnAddNode.classList.add('order__btn-add--hide');

	if (total.quantity > 1) {
		total.bowls[total.quantity - 1].priceNode.classList.add('order__total--hide');
	}

	const newChoiceWrapNode = getNewChoiceWrapNode();
	const newBtnAddNode = newChoiceWrapNode.querySelector('.order__btn-add');
	const newTotalNode = newChoiceWrapNode.querySelector('.order__total');
	const newBtnCloseNode = newChoiceWrapNode.querySelector('.order__btn-close');
	const bowlItems = newChoiceWrapNode.querySelectorAll('.order__item');

	const newBowl = createNewBowl(total, newTotalNode, newChoiceWrapNode, newBtnAddNode, newBtnCloseNode);

	addBowlToTotal(newChoiceWrapNode, newBowl, total);

	if (total.bowls.length === total.maxQuantity) {
		newBtnAddNode.classList.add('order__btn-add--hide');
	}

	handlerClickItem(bowlItems, newBowl, total);

	const choiceList = newChoiceWrapNode.querySelectorAll('.order__list');
	sliderInit(choiceList);

	newBtnCloseNode.addEventListener('click', handlerClickBtnClose(newBowl, total), { once: true });
	newBtnAddNode.addEventListener('click', handlerClickBtnAdd(newBtnAddNode, total));
};