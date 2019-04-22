import './Promocode.scss';
import React from 'react';

export default class Promocode extends React.Component {

	state = {
		code: ''
	}

	componentDidMount() {
		const body = document.body;
		const promocodeBtnClose = document.querySelector('.promocode__btn-close');
		const promocodeNode = document.querySelector('.promocode__modal');

		promocodeBtnClose.addEventListener('click', () => {
			document.documentElement.classList.remove('overflow-fix');
			body.classList.remove('darken');
			promocodeNode.classList.remove('modal--show');
		});
	}

	onSubmitPromocode = code => {
		let isError = false;

		const addError = el => {

			if (!el.parentElement.classList.contains('promocode__field--error')) {
				el.parentElement.classList.add('promocode__field--error');

				setTimeout(() => {
					el.parentElement.classList.remove('promocode__field--error');
				}, 900)
			}

			isError = true;

			el.addEventListener('input', () => {
				spanHelp.classList.remove('promocode__field-help--show');
			}, { once: true });
		};

		const inputNode = document.getElementById('promocode');
		const spanHelp = document.querySelector('.promocode__field-help');
		const { onCheckPromocode } = this.props;

		let discount = onCheckPromocode(code);

		if (code === '') {
			spanHelp.textContent = 'Введите промокод';
			addError(inputNode);
			spanHelp.classList.add('promocode__field-help--show');
		} else if (!discount) {
			spanHelp.textContent = 'Такого промокода нет';
			addError(inputNode);
			spanHelp.classList.add('promocode__field-help--show');
		} else {
			
			inputNode.disabled = true;
			const formPromocodeBtn = document.querySelector('.form__promocode-btn');

			formPromocodeBtn.textContent = `Ваша скидка ${discount}%`;

			this.onClose();
			const promocodeNode = document.querySelector('.promocode__modal');
			const promocodeTitle = promocodeNode.querySelector('.modal__title');
			const promocodeBtn = promocodeNode.querySelector('.modal__button');
			const promocodeBtnClose = document.querySelector('.promocode__btn-close');
			const promocodeSubtitle = promocodeNode.querySelector('.modal__subtitle');

			promocodeBtnClose.classList.add('promocode__btn-close--hidden');
			promocodeSubtitle.classList.add('modal__subtitle--hidden');
			promocodeTitle.textContent = `Ваша скидка ${discount}%`;
			promocodeBtn.textContent = 'Закрыть';
		}

	};

	onInput = e => {
		const value = e.target.value;

		this.setState({
			code: value.toLowerCase().trim()
		})
	};

	onClose = () => {
		const promocodeNode = document.querySelector('.promocode__modal');
		const body = document.body;
		const input = document.getElementById('promocode');


		document.documentElement.classList.remove('overflow-fix');
		body.classList.remove('darken');
		promocodeNode.classList.remove('modal--show');
		input.classList.remove('promocode__input--hover');
	};

	render() {
		const { code } = this.state;
		const { discount } = this.props;
		const {
			onSubmitPromocode,
			onInput,
			onClose
			} = this;

		return(
			<div className="promocode-app__wrap">
				<div className="modal__content">
					<div className="promocode">
						<div className="promocode__field">
							<input
								className="promocode__input promocode__input--hover"
								id="promocode"
								type="text"
								name="promocode"
								placeholder="Ваш промокод"
								onChange={onInput}
							/>
							<label
								className="promocode__label"
								htmlFor="promocode">Промокод</label>
							<span className="promocode__field-help" />
						</div>
					</div>
				</div>
				<div className="modal__footer">
					<span className="promocode__btn-close">Закрыть</span>
					<button
						className='button modal__button'
						type='button'
						onClick={() => discount ? onClose() : onSubmitPromocode(code)}
					>
						{ 'Подтвердить' }
					</button>
				</div>
			</div>
		)
	}
};



