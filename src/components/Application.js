import React, { useState } from 'react';
import DayList from './DayList';

import 'components/Application.scss';

const days = [
	{
		id: 1,
		name: 'Monday',
		spots: 2,
	},
	{
		id: 2,
		name: 'Tuesday',
		spots: 5,
	},
	{
		id: 3,
		name: 'Wednesday',
		spots: 0,
	},
];

export default function Application(props) {
	const [selectedDay, setSelectedDay] = useState('Monday');
	return (
		<main className='layout'>
			<section className='sidebar'>
				<img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>

					{/* setDay fn has been passed down to DayList, and passed down to DayListItem again, 
					because the trigger event is from DayListItem, the obtained day value will be retrieved 
					from DayListItem setDay fn, and logged here.  */}

					<DayList
						days={days}
						value={selectedDay} // Use generic way (value and onChange) to pass down day and setSelectedDay
						onChange={setSelectedDay}
					/>
				</nav>
				<img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
			</section>
			<section className='schedule'>
				{/* Replace this with the schedule elements during the "The Scheduler" activity. */}
			</section>
		</main>
	);
}

/*
  ////////////////////////////////////////////////////////////////////////////////////
  //  Using useState to update the setDay fn, since it accepts (day.name) as argument,
  //  it can be simple as: setDay={setSelectedDay}
  //
  //  setDay={(name) => {
	//		setSelectedDay(name);
	//	}}
  ////////////////////////////////////////////////////
*/
