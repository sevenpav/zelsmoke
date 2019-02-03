import { removeBowlFromTotal } from '../total-utils';
import { setChoicePrice } from '../total-utils';

export const handlerClickBtnClose = (bowl, total) => () => {

	const isLastExtraWrap = bowl.id === total.quantity;
	const isLastOfExtraWrap = total.quantity === 2;

	const showNodes = idx => {
		total.bowls[idx].btnAddNode.classList.remove('order__btn-add--hide');
		total.bowls[idx].priceNode.classList.remove('order__total--hide');
	}

	removeBowlFromTotal(bowl, total);

	if (isLastOfExtraWrap) {
		showNodes(0);
	} else if (isLastExtraWrap) {
		showNodes(bowl.id - 2);
	} else {
		const idx = total.quantity - 1;

		showNodes(idx);
	}

	setChoicePrice(bowl, total);
};