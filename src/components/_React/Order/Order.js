import './Order.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Form from '../Form/Form';

import { uniqueId } from 'lodash';
import cn from 'classnames';

import BowlSvg from './img/icon-bowl.svg';
import GrapefruitSvg from './img/icon-grapefruit.svg';
import PineappleSvg from './img/icon-pineapple.svg';
import FillerWaterSvg from './img/icon-filler-water.svg';
import FillerMilkSvg from './img/icon-filler-milk.svg';
import FillerFreshSvg from './img/icon-filler-fresh.svg';

import sliderInit from './slider';

const Btn = props => <button className="order__btn-add" type="button" onClick={props.handler}>Добавить еще одну чашу со скидкой 50%</button>;

const Total = ({ totalPrice, quantity }) => {
	const str = quantity !== 4 ? 'чаши' : 'чаш';

	return (
		<div className="order__total">
			<p className="order__total-label">Итого:</p>
			<p className="order__total-sum">{ quantity + 1 } { str } за { totalPrice } руб.</p>
		</div>
	)
};

const ItemBowl = (props) => {
	const { name, price, clickItem, id, filterBowls } = props;
	const Icon = () => {
		if (name === 'Глиняная') {
			return <BowlSvg className='order__icon'/>
		}
		if (name === 'Грейпфрут') {
			return <GrapefruitSvg className='order__icon'/>
		}

		return <PineappleSvg className='order__icon'/>
	};

	const itemClass = cn({
		'order__item': true,
		'order__item--active': props.isActive
	});

	return (
		<li className={itemClass} onClick={e => clickItem(e, name, price, id)}>
			<div className="order__sticker">
				{ props.isFirst && <button className="order__btn-close" type="button" onClick={(e) => filterBowls(e, id)} /> }
				<Icon />
			</div>
			<div className="order__desc">
				<p className="order__item-name">{ name }</p>
				<p className="order__item-price">{ price } руб.</p>
			</div>
		</li>
	)
};

const ItemFiller = (props) => {
	const { name, price, handler } = props;

	const Icon = () => {
		if (name === 'Вода') {
			return <FillerWaterSvg className='order__icon'/>
		}
		if (name === 'Молоко') {
			return <FillerMilkSvg className='order__icon'/>
		}

		return <FillerFreshSvg className='order__icon'/>
	};

	const itemClass = cn({
		'order__item': true,
		'order__item--active': props.isActive
	});

	return (
		<li className={itemClass} onClick={e => handler(e, name, price)}>
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


class Bowl extends React.Component {

	listRef = React.createRef();

	componentDidMount() {
		const node = this.listRef.current;

		sliderInit([node]);
	};

	render() {

		const {
			updateBowls,
			id,
			totalPrice,
			isLast,
			addBowl,
			filterBowls,
			isMax,
			bowls
		} = this.props;

		return (
			<div className="order__extra-choice-wrap">
				<div className="order__choice">
					<ul className="order__list" ref={this.listRef}>
						<ItemBowl name={'Глиняная'} price={750} isActive={true} isFirst={true} clickItem={updateBowls} id={id} filterBowls={filterBowls} />
						<ItemBowl name={'Грейпфрут'} price={900} clickItem={updateBowls} id={id} filterBowls={filterBowls} />
						<ItemBowl name={'Ананас'} price={1000} clickItem={updateBowls} id={id} filterBowls={filterBowls} />
					</ul>
				</div>
				{ isLast && <Total totalPrice={totalPrice} quantity={bowls.length}/> }
				{ isLast && !isMax && <Btn handler={addBowl}/> }
			</div>
		)
	};
}

class Order extends React.Component {

	state = {
		hookah: {
			bowl: {
				name: 'Глиняная',
				price: 1500
			},
			filler: {
				name: 'Вода',
				price: 0
			},
			priceHookah: 1500
		},
		bowls: [],
		lastActive: false,
		totalPrice: 1500,
		maxQuantity: 4
	};

	componentDidMount() {
		sliderInit(document.querySelectorAll('.order__list'));
	};

	classToggle = e => {
		const node = e.currentTarget;
		const parent = node.parentElement;
		const otherNode = parent.querySelectorAll('.order__item--active');

		otherNode.forEach(node => node.classList.remove('order__item--active'));
		node.classList.toggle('order__item--active');
	};

	updateBowl = (e, name, price) => {
		this.classToggle(e);
		this.updateHookah('bowl', name, price);
		this.calcTotalPrice();
	};

	updateFiller = (e, name, price) => {
		this.classToggle(e);
		this.updateHookah('filler', name, price);
		this.calcTotalPrice();

	};

	calcTotalPrice = () => {

		this.setState(prevState => {
			const {
				hookah: { priceHookah },
				bowls
			} = prevState;

			const totalPriceBowls = bowls.reduce((acc, bowl) => acc + bowl.price, 0);

			return {
				totalPrice: priceHookah + totalPriceBowls
			}
		})
	};

	filterBowls = (e, id) => {
		e.stopPropagation();
		const oldBowls = this.state.bowls;
		const filteredBowls = oldBowls.filter(bowl => bowl.id !== id);

		this.setState({
			bowls: filteredBowls
		});


		this.calcTotalPrice();
	}

	updateBowls = (e, name, price, id) => {
		const bowls = this.state.bowls;
		const updatedBowls = bowls.map(bowl => {
			if (bowl.id === id) {
				bowl.name = name;
				bowl.price = price;
			}

			return bowl;
		})

		this.setState({
			bowls: updatedBowls
		});

		this.calcTotalPrice();

		this.classToggle(e);
	};

	updateHookah = (choice, name, price) => {
		const hookah = this.state.hookah;

		const otherPrice = choice === 'bowl' ? hookah.filler.price : hookah.bowl.price;

		this.setState({
			hookah: {
				...hookah,
				[choice]: {
					name,
					price
				},
				priceHookah: otherPrice + price
			}
		})
	};

	addBowl = () => {
		const bowls = this.state.bowls;

		this.setState({
			bowls: [ ...bowls, { name: 'Глиняная', price: 750, id: uniqueId() } ]
		});

		this.calcTotalPrice();
	};

	onSubmitForm = (name, phone) => {
		const { hookah, bowls, totalPrice } = this.state;

		const hookahStr = `<br>Чаша: ${hookah.bowl.name}<br>Наполнитель: ${hookah.filler.name}<br>Цена ${hookah.priceHookah} руб.<br>`;

		const bowlsStr = bowls.reduce((acc, bowl, idx) => {
			if (idx === 0) {
				acc += `<br>Чаша: ${bowl.name}<br>Цена: ${bowl.price} руб.<br>`;
			} else {
				acc += `____<br>Чаша: ${bowl.name}<br>Цена: ${bowl.price} руб.<br>`;
			}

			return acc;
		}, '');

		const totalPriceStr = `${totalPrice}`;

		const data = new FormData();

		data.append('name', name);
		data.append('phone', phone);
		data.append('hookah', hookahStr);
		data.append('bowls', bowlsStr);
		data.append('sum', totalPriceStr);

		return fetch('/order.php',
			{
				method: 'POST',
				body: data
			});
	};

	render() {

		const {
			updateBowl,
			updateFiller,
			updateBowls,
			addBowl,
			filterBowls,
			onSubmitForm
		} = this;

		const {
			hookah,
			totalPrice,
			bowls,
			maxQuantity
		} = this.state;

		return (
			<div className='order__wrap'>
				<div className="order__choice-wrap">
					<div className="order__choice" id="bowl">
						<ul className="order__list">
							<ItemBowl name={'Глиняная'} price={1500} isActive={true} clickItem={updateBowl} />
							<ItemBowl name={'Грейпфрут'} price={1800} clickItem={updateBowl} />
							<ItemBowl name={'Ананас'} price={2000} clickItem={updateBowl} />
						</ul>
					</div>
					<div className="order__choice" id="filler">
						<ul className="order__list">
							<ItemFiller name={'Вода'} price={0} isActive={true} handler={updateFiller}/>
							<ItemFiller name={'Молоко'} price={100} handler={updateFiller}/>
							<ItemFiller name={'Фреш микс'} price={250} handler={updateFiller}/>
						</ul>
					</div>
					<div className="order__price">
						<p className="order__price-label">Цена:</p>
						<p className="order__price-sum">{hookah.priceHookah} руб.</p>
					</div>
					{
						!this.state.bowls.length && <Btn handler={this.addBowl} />
					}
				</div>
				{ this.state.bowls.map((bowl, idx, arr) => {
					const isMax = arr.length === maxQuantity;

					if (idx === arr.length - 1) {

						return (
							<Bowl
								key={bowl.id}
								id={bowl.id}
								addBowl={addBowl}
								updateBowls={updateBowls}
								totalPrice={totalPrice}
								filterBowls={filterBowls}
								bowls={bowls}
								isLast={true}
								isMax={isMax}
							/>
						)
					}

					return (
						<Bowl
							key={bowl.id}
							id={bowl.id}
							addBowl={addBowl}
							updateBowls={updateBowls}
							totalPrice={totalPrice}
							filterBowls={filterBowls}
							bowls={bowls}
						/>
					)
					})
				}
				<Form mixes={'order'} onSubmitForm={onSubmitForm}/>
			</div>
		)
	}
}

ReactDOM.render(<Order />, document.querySelector('.order__app'));
