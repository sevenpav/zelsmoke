import React from 'react';
import sliderInit from '../slider'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { ItemBowl } from './Item';
import { Btn } from './Btn';


const Total = ({ totalPrice, quantity }) => {
	const str = quantity !== 4 ? 'чаши' : 'чаш';

	return (
		<div className="order__total">
			<p className="order__total-label">Итого:</p>
			<p className="order__total-sum">{ quantity + 1 } { str } за { totalPrice } руб.</p>
		</div>
	)
};

export default class Bowl extends React.Component {

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
						<ItemBowl
							name={'Глиняная'}
							price={750}
							isActive={true}
							isFirst={true}
							clickItem={updateBowls}
							id={id}
							filterBowls={filterBowls}
						/>
						<ItemBowl
							name={'Грейпфрут'}
							price={900}
							clickItem={updateBowls}
							id={id}
							filterBowls={filterBowls}
						/>
						<ItemBowl
							name={'Ананас'}
							price={1000}
							clickItem={updateBowls}
							id={id}
							filterBowls={filterBowls}
						/>
					</ul>
				</div>
				<ReactCSSTransitionGroup
					transitionName="bowl-footer"
					transitionEnterTimeout={200}
					transitionLeave={false}>
					{ isLast && <Total totalPrice={totalPrice} quantity={bowls.length}/> }
					{ isLast && !isMax && <Btn handler={addBowl}/> }
				</ReactCSSTransitionGroup>
			</div>
		)
	};
}
