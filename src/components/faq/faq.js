import './faq.scss';

const items = document.querySelectorAll('.faq__item-top');

items.forEach(el => {
	el.addEventListener('click', () => {
		el.parentElement.classList.toggle('faq__item--open');
	})
});

