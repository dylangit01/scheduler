import React from 'react';
import './DayListItem.scss'

const classnames = require('classnames'); 

const DayListItem = ({ name, spots, selected, setDay }) => {

	const buttonClass = classnames('day-list__item', {
		'day-list__item--selected ': selected,
		'day-list__item--full': spots === 0,	// if spots =0, full style will apply
	});

	return (
		<li selected={selected} className={buttonClass} onClick={() => setDay(name)}>
			<h2 className='text--regular'>{name}</h2>
			<h3 className='text--light'>{spots} sports remaining</h3>
		</li>
	);
};

export default DayListItem
