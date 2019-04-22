import './assets/scss/common.scss';

// if (location.port != 8080) {
// 	__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
// }

const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

export const fullpage = () => {

	const fullpage = document.querySelector('.fullpage');

	fullpage.style.height = `${window.innerHeight}px`;

	window.addEventListener('resize', () => {

		if (!isTouchDevice) {
			fullpage.style.height = `${window.innerHeight}px`;
		}
	});

};