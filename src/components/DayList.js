import React from 'react';
import DayListItem from './DayListItem';

const DayList = ({ days, value, onChange }) => {
	return (
		<ul>
			{[...days].map(({ id, name, spots }) => (
				<DayListItem
					key={id}
					// destructuring day
					{...{ name, spots }}
					// Once the day(value) equals the the current name value, that day is the selected day
					selected={name === value}
					// Add name inside the fn, so that we no longer need to pass name to DayListItem
					setDay={(e) => onChange(name)}
				/>
			))}
		</ul>
	);
};

export default DayList;
