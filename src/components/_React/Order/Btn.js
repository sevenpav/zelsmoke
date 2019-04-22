import React from 'react';

export const Btn = ({ handler }) => (
	<button
		className="order__btn-add"
		type="button"
		onClick={handler}>
		Добавить еще одну чашу со скидкой 50%</button>
);