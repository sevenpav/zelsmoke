export const total = {
	quantity: 1,
	maxQuantity: 5,
	finalPrice: 1500,
	bowls: [
		{
			name: 'Глиняная',
			price: 1500,
			isFirst: true,
			priceNode: document.querySelector('.order__price'),
			wrapNode: document.querySelector('.order__choice-wrap'),
			btnAddNode: document.querySelector('.order__btn-add'),
			btnCloseNode: null,
			id: 1
		}
	],
	filler: {
		name: 'Вода',
		price: 0
	}
};

const order = document.querySelector('.order');
const form = document.querySelector('.order__form');

export const getTotalSum = total => total.bowls.reduce((acc, bowl) => acc += bowl.price, total.filler.price);

export const getChoicePrice = (bowl, total) => bowl.price + total.filler.price;
export const setChoicePrice = (bowl, total) => {
	const totalSum = getTotalSum(total);

	total.finalPrice = totalSum;

	if (bowl.isFirst) {
		const sumNode = bowl.priceNode.lastElementChild;

		sumNode.textContent = `${getChoicePrice(bowl, total)} руб.`;
	}

	if (total.quantity > 1) {
		const str = total.quantity < 5 ? 'чаши' : 'чаш';
		const sumNode = total.bowls[total.bowls.length - 1].priceNode.lastElementChild;

		sumNode.textContent = `${total.quantity} ${str} за ${totalSum} руб.`;
	}
};

export const updateTarget = (target, node, total) => {
	const itemPriceNode = node.querySelector('.order__item-price');
	const targetLink = node.parentElement.parentElement.id !== 'filler' ? target : total.filler

	targetLink.name = node.querySelector('.order__item-name').textContent;
	targetLink.price = itemPriceNode ? parseInt(itemPriceNode.textContent, 10) : 0;

	setChoicePrice(target, total);
};

export const createNewBowl = (total, priceNode, wrapNode, btnAddNode, btnCloseNode) => ({
	name: 'Глиняная',
	price: 750,
	priceNode,
	wrapNode,
	btnAddNode,
	btnCloseNode,
	id: total.quantity + 1
});

export const addBowlToTotal = (newWrapNode, bowl, total) => {
	order.insertBefore(newWrapNode, form);
	total.bowls.push(bowl);
	total.quantity++;

	setChoicePrice(bowl, total);
};

export const removeBowlFromTotal = (bowl, total) => {
	bowl.wrapNode.remove()
	total.bowls = total.bowls.filter(el => el !== bowl);
	total.quantity--;
};