import './assets/scss/common.scss';

// const fade = (time, el) => {
// 	let op = 1;
// 	const timer = setInterval(() => {
// 		if (op <= 0.1){
// 			clearInterval(timer);
// 			el.style.display = 'none';
// 			if (preloader.style.display === 'none') {
// 				return false;
// 			}
// 			fade(20, preloader);
// 		}
// 		el.style.opacity = op;
// 		el.style.filter = 'alpha(opacity=' + op * 100 + ")";
// 		op -= op * 0.1;
// 	}, time);
// }

export const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;