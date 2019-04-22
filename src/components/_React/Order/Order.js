import './Order.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Form from '../Form/Form';
import Promocode from '../Promocode/Promocode';

import { uniqueId } from 'lodash';

import Bowl from './Bowl';
import { ItemBowl, ItemFiller } from './Item';
import { Btn } from './Btn';

import sliderInit from './slider';

class Order extends React.Component {

	state = {
		hookah: {
			bowl: {
				name: 'Глиняная',
				price: 1600
			},
			filler: {
				name: 'Вода',
				price: 0
			},
			priceHookah: 1600
		},
		bowls: [],
		lastActive: false,
		totalPrice: 1600,
		maxQuantity: 4,
		codes: [
			['zelenogram', 10],
			['пятница', 10]
		],
		discount: 0,
		promocode: ''
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
				bowls,
			} = prevState;

			const totalPriceBowls = bowls.reduce((acc, bowl) => acc + bowl.price, 0);
			const price = Math.floor(priceHookah + totalPriceBowls);

			return {
				totalPrice: price
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

		const discount = this.state.discount ? (otherPrice + price) * (this.state.discount / 100) : 0;

		this.setState({
			hookah: {
				...hookah,
				[choice]: {
					name,
					price
				},
				priceHookah: Math.floor((otherPrice + price) - discount)
			}
		})
	};

	addBowl = () => {
		const bowls = this.state.bowls;

		this.setState({
			bowls: [ ...bowls, { name: 'Глиняная', price: 800, id: uniqueId() } ]
		});

		this.calcTotalPrice();
	};

	onSubmitForm = (name, phone) => {

		const { hookah, bowls, totalPrice, promocode } = this.state;
		const hookahStr = `<br>Чаша: <b>${hookah.bowl.name}</b><br>Наполнитель: <b>${hookah.filler.name}</b><br>Цена: <b>${hookah.priceHookah} руб.</b><br>`;

		let bowlsStr;

		if (bowls.length === 0) {
			bowlsStr = ` Нет<br>`;
		} else {
			bowlsStr = bowls.reduce((acc, bowl, idx) => {

				if (idx === 0) {
					acc += `<br>Чаша: <b>${bowl.name}</b><br>Цена: <b>${bowl.price} руб.</b><br>`;
				} else {
					acc += `____<br>Чаша: <b>${bowl.name}</b><br>Цена: <b>${bowl.price} руб.</b><br>`;
				}

				return acc;
			}, '');
		}

		const totalPriceStr = `${totalPrice}`;
		const data = new FormData();

		data.append('name', name);
		data.append('phone', phone);
		data.append('hookah', hookahStr);
		data.append('bowls', bowlsStr);
		data.append('sum', totalPriceStr);
		data.append('promocode', promocode);

		return fetch('/order.php',
			{
				method: 'POST',
				body: data
			});
	};

	onCheckPromocode = code => {
		const { codes } = this.state;
		let discount = 0;

		codes.forEach(item => {

			if (item[0] === code) {
				discount = item[1]

				this.setState(() => {
					return {
						promocode: code,
						discount
					}
				});

				const hookah = this.state.hookah;
				const { priceHookah } = this.state.hookah;
				const discountSum = discount ? priceHookah * (discount / 100) : 0;

				this.setState({
					hookah: {
						...hookah,
						priceHookah: Math.floor(priceHookah - discountSum)
					}
				});

				this.calcTotalPrice(discount);
			}
		});

		return discount;
	};

	render() {

		const {
			updateBowl,
			updateFiller,
			updateBowls,
			addBowl,
			filterBowls,
			onSubmitForm,
			onCheckPromocode
		} = this;

		const {
			hookah,
			totalPrice,
			bowls,
			maxQuantity,
			discount
		} = this.state;

		return (
			<div className='order__wrap'>
				<div className="order__choice-wrap">
					<div className="order__choice" id="bowl">
						<ul className="order__list">
							<ItemBowl
								name={'Глиняная'}
								price={1600}
								isActive={true}
								clickItem={updateBowl}
							/>
							<ItemBowl
								name={'Грейпфрут'}
								price={1900}
								clickItem={updateBowl}
							/>
							<ItemBowl
								name={'Ананас'}
								price={2200}
								clickItem={updateBowl}
							/>
						</ul>
					</div>
					<div className="order__choice" id="filler">
						<ul className="order__list">
							<ItemFiller
								name={'Вода'}
								price={0}
								isActive={true}
								updateFiller={updateFiller}
							/>
							<ItemFiller
								name={'Молоко'}
								price={100}
								updateFiller={updateFiller}
							/>
							<ItemFiller
								name={'Фреш микс'}
								price={250}
								updateFiller={updateFiller}
							/>
						</ul>
					</div>
					<div className="order__price">
						<p className="order__price-label">Цена:</p>
						<p className="order__price-sum">{hookah.priceHookah} руб.</p>
					</div>
					{ !this.state.bowls.length && <Btn handler={this.addBowl} /> }
				</div>
				<ReactCSSTransitionGroup
					transitionName="bowls"
					transitionEnterTimeout={100}
					transitionLeave={false}>
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
				</ReactCSSTransitionGroup>

				<Form mixes={'order'} onSubmitForm={onSubmitForm}/>
				<div className="modal promocode__modal">
					<div className="modal__wrap">
						<div className="modal__header">
							<h5 className="modal__title">Скидка</h5>
							<p className="modal__subtitle">Введите промокод, цена будет указана уже со скидкой</p>
						</div>
						<Promocode onCheckPromocode={onCheckPromocode} discount={discount}/>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Order />, document.querySelector('.order__app'));
