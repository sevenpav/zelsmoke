import './Button.scss';

import React from 'react';
import cn from 'classnames';

import Spinner from './spinner.svg';



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