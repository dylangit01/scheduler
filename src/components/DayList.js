import React from 'react';
import DayListItem from './DayListItem';

const DayList = ({ days, day, setDay }) => {
	return (
		<ul>
			{[...days].map(({ id, name, spots }) => (
				<DayListItem
					key={id}
					name={name}
					spots={spots}
					// Whenever the day={''} in DayList of App === the day of DataBase,
					// that day is the selected day
					selected={name === day}
					setDay={(e) => setDay(name)} // Add name inside the fn, so in DayListItem, we no longer need name in setDay fn
				/>
			))}
		</ul>
	);
};

export default DayList;
