import { updateTarget } from '../total-utils';

export const handlerClickItem = (items, target, total) => {
	items.forEach(item => {
		item.addEventListener('click', function(e) {

			if(!e.currentTarget.classList.contains('order__item--active')) {
				items.forEach(el => {
					el.classList.remove('order__item--active');
				})

				this.classList.add('order__item--active');

				updateTarget(target, this, total);
			}
		});
	});
};