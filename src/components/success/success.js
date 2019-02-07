import './success.scss';

const successBlock = document.querySelector('.success');
const successBtnClose = successBlock.querySelector('.success__btn-close');

successBtnClose.addEventListener('click', () => {

	successBlock.classList.remove('success--animate');
	successBlock.classList.remove('success--show');
	document.body.classList.remove('darken');
	document.body.classList.remove('fixed');
	document.documentElement.classList.remove('overflow-fix');

});