import './Form.scss';
import React from 'react';

import cn from 'classnames';
import Button from '../Button/Button';
import IMask from 'imask';

export default class Form extends React.Component {

	state = {
		name: '',
		phone: ''
	};

	componentDidMount() {
		const form = document.querySelector('.form');
		const btnAgreeNode = form.querySelector('.form__agree-btn');
		const phone = document.getElementById('phone');
		const phoneMask = new IMask(phone, { mask: '+{7} (000) 000-00-00' });
		const body = document.body;

		btnAgreeNode.addEventListener('click', () => {
			const terms = document.querySelector('.terms__modal');

			document.documentElement.classList.add('overflow-fix');
			body.classList.add('darken');
			terms.classList.add('modal--show');
		})

		const promocodeNode = document.querySelector('.promocode__modal');
		const btnPromocodeNode = form.querySelector('.form__promocode-btn');

		btnPromocodeNode.addEventListener('click', () => {
			document.documentElement.classList.add('overflow-fix');
			body.classList.add('darken');
			promocodeNode.classList.add('modal--show');
		});


	};

	onInput = e => {
		const node = e.currentTarget;
		const value = e.target.value;

		if (node.name === 'name') {
			this.setState({
				name: value
			})
		} else {
			this.setState({
				phone: value
			})
		}
	};

	onSubmit = e => {
		e.preventDefault();

		const { name, phone } = this.state;
		const form = document.querySelector('.form');
		const inputs = form.querySelectorAll('.form__input');
		const btn = document.querySelector('.form__button');
		const spinner = document.querySelector('.button__spinner');

		btn.setAttribute('disabled', 'true');
		btn.classList.add('form__button--disabled');

		let isError = false;

		const addError = el => {

			if (!el.parentElement.classList.contains('form__field--error')) {
				el.parentElement.classList.add('form__field--error');

				setTimeout(() => {
					el.parentElement.classList.remove('form__field--error');
				}, 900)
			}

			isError = true;
		};

		inputs.forEach(el => {
			if (el.value === '') {
				addError(el);
			} else if (el.name === 'phone' && el.value.length < 18) {
				addError(el);
				const spanHelp = el.parentElement.querySelector('.form__field-help');

				spanHelp.classList.add('form__field-help--show');
				el.addEventListener('input', () => {
					spanHelp.classList.remove('form__field-help--show');
				}, { once: true });
			}
		});

		if (isError) {
			btn.removeAttribute('disabled');
			btn.classList.remove('form__button--disabled');
			return false;
		}

		btn.classList.add('form__button--loading');
		spinner.classList.add('button__spinner--active');


		this.props.onSubmitForm(name, phone)
			.then((res) => {
				inputs.forEach(el => {
					el.value = '';
				});

				btn.classList.remove('form__button--loading');
				spinner.classList.remove('button__spinner--active');

				btn.removeAttribute('disabled');
				btn.classList.remove('form__button--disabled');

				if (res.ok) {
					const body = document.body;
					const success = document.querySelector('.success__modal');

					document.documentElement.classList.add('overflow-fix');
					body.classList.add('darken');
					success.classList.add('modal--show');

				} else {
					throw new Error('Ошибка отправки данных');
				}

			})
			.catch((e) => {
				console.log(e.message);
			});
	};


	render() {
		const { mixes } = this.props;
		const { onSubmit, onInput } = this;
		const formClass = cn({
			form: true,
			[`${mixes}__form`]: mixes && true
		})

		return (

			<form
				className={formClass}
				action=""
				autoComplete="off"
				onSubmit={onSubmit}
			>
				<div className="form__field">
					<input className="form__input"
								 id="name"
								 type="text"
								 name="name"
								 placeholder="Паша"
								 onChange={onInput}
					/>
					<label
						className="form__label"
						htmlFor="name"
					>Ваше имя</label>
				</div>
				<div className="form__field">
					<input
						className="form__input"
						id="phone"
						type="tel"
						name="phone"
						placeholder="926-909-96-00"
						onChange={onInput}
					/>
					<label
						className="form__label"
						htmlFor="phone"
					>Номер</label>
					<span className="form__field-help">Номер должен быть 11 цифр</span>
				</div>
				<div className="form__field-button">
					<Button
						text={'Заказать'}
						type={'submit'}
						mixes={'form'}
					>Заказать</Button>
					<span className="form__promocode-btn">Есть промокод?</span>
					<span className="form__agree-text">
					Нажимая на кнопку вы подтверждаете, что <span className="form__agree-btn">согласны с условиями договора аренды</span>
				</span>
				</div>
			</form>
		)
	};
};