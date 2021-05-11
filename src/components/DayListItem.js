import React from 'react';
import './DayListItem.scss'

// import classnames library:
import classnames from 'classnames';

const DayListItem = ({ name, spots, selected, setDay }) => {

	const dayListClass = classnames('day-list__item', {
		'day-list__item--selected ': selected,
		'day-list__item--full': spots === 0,	// if spots === 0, full style will apply
	});

	return (
		<li selected={selected} className={dayListClass} onClick={() => setDay(name)}>
			<h2 className='text--regular'>{name}</h2>
			<h3 className='text--light'>{spots === 1 ? '1 spot' : spots === 0 ? 'no spots' : `${spots} spots`} remaining</h3>
		</li>
	);
};

export default DayListItem
