import './success.scss';

const successBlock = document.querySelector('.success');
const successBtnClose = successBlock.querySelector('.success__btn-close');

successBtnClose.addEventListener('click', () => {
	document.documentElement.classList.remove('overflow-fix');
	successBlock.classList.remove('success--show');
	document.body.classList.remove('darken');
	document.body.classList.remove('fixed');
});