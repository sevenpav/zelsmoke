import './Order.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Form from '../Form/Form';

import { uniqueId } from 'lodash';

import Bowl from './subComponents/Bowl';
import { ItemBowl, ItemFiller } from './subComponents/Item';
import { Btn } from './subComponents/Btn';

import sliderInit from './slider';

const { Provider, Consumer } = React.createContext();

export { Consumer };

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

		let bowlsStr;

		if (bowls.length === 0) {
			bowlsStr = ` Нет<br>`;
		} else {
			bowlsStr = bowls.reduce((acc, bowl, idx) => {
				if (idx === 0) {
					acc += `<br>Чаша: ${bowl.name}<br>Цена: ${bowl.price} руб.<br>`;
				} else {
					acc += `____<br>Чаша: ${bowl.name}<br>Цена: ${bowl.price} руб.<br>`;
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
							<ItemBowl
								name={'Глиняная'}
								price={1500}
								isActive={true}
								clickItem={updateBowl}
							/>
							<ItemBowl
								name={'Грейпфрут'}
								price={1800}
								clickItem={updateBowl}
							/>
							<ItemBowl
								name={'Ананас'}
								price={2000}
								clickItem={updateBowl}
							/>
						</ul>
					</div>
					<div className="order__choice" id="filler">
						<ul className="order__list">
							<ItemFiller name={'Вода'} price={0} isActive={true} updateFiller={updateFiller}/>
							<ItemFiller name={'Молоко'} price={100} updateFiller={updateFiller}/>
							<ItemFiller name={'Фреш микс'} price={250} updateFiller={updateFiller}/>
						</ul>
					</div>
					<div className="order__price">
						<p className="order__price-label">Цена:</p>
						<p className="order__price-sum">{hookah.priceHookah} руб.</p>
					</div>
					<ReactCSSTransitionGroup
						transitionName="bowl-footer"
						transitionEnterTimeout={400}
						transitionLeave={false}>
						{
							!this.state.bowls.length && <Btn handler={this.addBowl} />
						}
					</ReactCSSTransitionGroup>
				</div>
				<ReactCSSTransitionGroup
					transitionName="bowls"
					transitionEnterTimeout={200}
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
			</div>
		)
	}
}

ReactDOM.render(<Order />, document.querySelector('.order__app'));
