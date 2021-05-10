import React from 'react';
import DayListItem from './DayListItem';

const DayList = ({days, day, setDay}) => {
	return (
		<ul>
			{[...days].map(({id, name, spots}) => (
				<DayListItem
					key={id}
					name={name}
					spots={spots}
					// Whenever the day={''} in DayList of App === the day of DataBase, 
					// that day is the selected day 
					selected={name === day}
					setDay={setDay}
				/>
			))}
		</ul>
	);
};

export default DayList;
