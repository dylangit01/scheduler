import React, { useState } from 'react';
import DayList from './DayList';
import Appointment from './Appointment';

import 'components/Application.scss';

const appointments = [
	{
		id: 1,
		time: '12pm',
	},
	{
		id: 2,
		time: '1pm',
		interview: {
			student: 'Lydia Miller-Jones',
			interviewer: {
				id: 1,
				name: 'Sylvia Palmer',
				avatar: 'https://i.imgur.com/LpaY82x.png',
			},
		},
	},
	{
		id: 3,
		time: '10am',
		interview: {
			student: 'Dylan',
			interviewer: {
				id: 3,
				name: 'Mildred Nazir',
				avatar: 'https://i.imgur.com/T2WwVfS.png',
			},
		},
	},
	{
		id: 4,
		time: '3pm',
		interview: {
			student: 'Sienna',
			interviewer: {
				id: 5,
				name: 'Sven Jones',
				avatar: 'https://i.imgur.com/twYrpay.jpg',
			},
		},
	},
	{
		id: 5,
		time: '10am',
		interview: {
			student: 'Jack',
			interviewer: {
				id: 2,
				name: 'Tori Malcolm',
				avatar: 'https://i.imgur.com/Nmx0Qxo.png',
			},
		},
	},
];

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
				{[...appointments].map(({ id, interview, time }) => (
					<Appointment key={id} interview={interview} time={time} />
				))}
				<Appointment key='last' time='5pm' />
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
