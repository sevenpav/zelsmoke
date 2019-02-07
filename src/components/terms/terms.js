import './terms.scss';
import '../button/button';
const termsNode = document.querySelector('.terms');
const btnCloseNode = termsNode.querySelector('.terms__button');

btnCloseNode.addEventListener('click', () => {

	termsNode.classList.remove('terms--animate');
	termsNode.classList.remove('terms--show');
	document.documentElement.classList.remove('overflow-fix');
	document.body.classList.remove('darken');

});

