import './Button.scss';

import Spinner from './spinner.svg';

import React from 'react';
import cn from 'classnames';

const Button = ({ text, type, mixes }) => {

	const btnClass = cn({
		button: true,
		[`${mixes}__button`]: mixes && true
	})

	return (
		<button
			className={btnClass}
			type={type}
		>
			{ type === 'submit' && <Spinner className='button__spinner' /> }
			{ text }
		</button>
	)
};

export default Button;