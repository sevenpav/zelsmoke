import React from 'react';

import cn from 'classnames';

import BowlSvg from '../img/icon-bowl.svg';
import GrapefruitSvg from '../img/icon-grapefruit.svg';
import PineappleSvg from '../img/icon-pineapple.svg';
import FillerWaterSvg from '../img/icon-filler-water.svg';
import FillerMilkSvg from '../img/icon-filler-milk.svg';
import FillerFreshSvg from '../img/icon-filler-fresh.svg';


const iconMap = {
	['Глиняная']: BowlSvg,
	['Грейпфрут']: GrapefruitSvg,
	['Ананас']: PineappleSvg,
	['Вода']: FillerWaterSvg,
	['Молоко']: FillerMilkSvg,
	['Фреш микс']: FillerFreshSvg
}

export const ItemBowl = (props) => {
	const {
		name,
		price,
		clickItem,
		id,
		filterBowls,
		isFirst
	} = props;

	const itemClass = cn({
		'order__item': true,
		'order__item--active': props.isActive
	});

	const Icon = iconMap[name];

	return (
		<li
			className={itemClass}
			onClick={e => clickItem(e, name, price, id)}
		>
			<div className="order__sticker">
				{
					isFirst &&
					<button
						className="order__btn-close"
						type="button"
						onClick={(e) => filterBowls(e, id)}
					/>
				}
				<Icon />
			</div>
			<div className="order__desc">
				<p className="order__item-name">{ name }</p>
				<p className="order__item-price">{ price } руб.</p>
			</div>
		</li>
	)
};

export const ItemFiller = (props) => {
	const {
		name,
		price,
		updateFiller
	} = props;

	const Icon = iconMap[name];

	const itemClass = cn({
		'order__item': true,
		'order__item--active': props.isActive
	});

	return (
		<li
			className={itemClass}
			onClick={e => updateFiller(e, name, price)}
		>
			<div className="order__sticker">
				<Icon />
			</div>
			<div className="order__desc">
				<p className="order__item-name">{ name }</p>
				<p className="order__item-price">{ price } руб.</p>
			</div>
		</li>
	)
};

