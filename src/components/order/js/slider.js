const sliderInit = lists => {

	const bindUIEvents = list => {
		const slider = {
			list,
			items: Array.from(list.children),
			itemWidth: 160,
			touchstartx: 0,
			touchmovex: 0,
			movex: 0,
			index: 0,
			translateX: 0,
			longTouch: false
		};

		slider.items.forEach(item => {
			item.addEventListener('touchstart', e => {
				start(e, slider);
			});

			item.addEventListener('touchmove', e => {
				e.preventDefault();
				move(e, slider);
			});

			item.addEventListener('touchend', e => {
				end(e, slider);
			});
		})
	};

	const start = (e, slider) => {
		setTimeout(() => {
			slider.longTouch = true;
		}, 250);
		slider.touchstartx = e.touches[0].pageX;

		slider.list.classList.remove('order__list--animate')
	};

	const move = (e, slider) => {
		slider.touchmovex = e.touches[0].pageX;
		slider.movex = slider.index * slider.itemWidth + (slider.touchstartx - slider.touchmovex);

		if (slider.movex < 600) {
			slider.list.style.transform = `translateX(-${slider.movex}px)`;
		}
	};

	const end = (e, slider) => {

		const absMove = Math.abs(slider.index * slider.itemWidth - slider.movex);

		if (absMove > slider.itemWidth / 2 || slider.longTouch === false) {

			if (slider.movex > slider.index * slider.itemWidth && slider.index < 2) {
				slider.index++;
			} else if (slider.movex < slider.index * slider.itemWidth && slider.index > 0) {
				slider.index--;
			}
		}
		slider.translateX = slider.index * slider.itemWidth;
		slider.list.classList.add('order__list--animate');
		slider.list.style.transform = `translateX(-${slider.translateX}px)`;
	};

	const init = lists => {

		lists.forEach(list => {
			bindUIEvents(list);
		})
	};

	init(lists);
};

export default sliderInit;