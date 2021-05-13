import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

import 'components/Application.scss';

// const appointments = [
// 	{
// 		id: 1,
// 		time: '12pm',
// 	},
// 	{
// 		id: 2,
// 		time: '1pm',
// 		interview: {
// 			student: 'Lydia Miller-Jones',
// 			interviewer: {
// 				id: 1,
// 				name: 'Sylvia Palmer',
// 				avatar: 'https://i.imgur.com/LpaY82x.png',
// 			},
// 		},
// 	},
// 	{
// 		id: 3,
// 		time: '10am',
// 		interview: {
// 			student: 'Dylan',
// 			interviewer: {
// 				id: 3,
// 				name: 'Mildred Nazir',
// 				avatar: 'https://i.imgur.com/T2WwVfS.png',
// 			},
// 		},
// 	},
// 	{
// 		id: 4,
// 		time: '3pm',
// 		// interview: {
// 		// 	student: 'Sienna',
// 		// 	interviewer: {
// 		// 		id: 5,
// 		// 		name: 'Sven Jones',
// 		// 		avatar: 'https://i.imgur.com/twYrpay.jpg',
// 		// 	},
// 		// },
// 	},
// 	{
// 		id: 5,
// 		time: '10am',
// 		interview: {
// 			student: 'Jack',
// 			interviewer: {
// 				id: 2,
// 				name: 'Tori Malcolm',
// 				avatar: 'https://i.imgur.com/Nmx0Qxo.png',
// 			},
// 		},
// 	},
// ];

export default function Application(props) {
	// const [day, setDay] = useState('Monday');
	// const [days, setDays] = useState([]);

	// Combine states:
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});
	// setDay function can remain because we are only using it to update our DayList component.
	const setDay = (day) => setState({ ...state, day });
	// setDays fn will be refactored with fetch appointments fn:
	// const setDays = (days) => setState((prev) => ({ ...prev, days }));		// why useEffect not complain now?

	useEffect(() => {
		const ENDPOINT_DAY = 'http://localhost:8001/api/days';
		const ENDPOINT_APPOINTMENTS = 'http://localhost:8001/api/appointments';
		const ENDPOINT_INTERVIEWERS = 'http://localhost:8001/api/interviewers';

		// using Promise.all to fetch all data from three different endpoints and return them by order
		Promise.all([
			axios.get(ENDPOINT_DAY),
			axios.get(ENDPOINT_APPOINTMENTS),
			axios.get(ENDPOINT_INTERVIEWERS)])
			.then((all) => {
				const [days, appointments, interviewers] = all;
				setState((prev) => ({...prev, 	// what is the difference without prev?
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				}));
			}
		);
	}, []); //When a component does not have any dependencies, but we only want it to run once, we have to pass useEffect an empty array.

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
						days={state.days}
						value={state.day} // Use generic way (value and onChange) to pass down day and setSelectedDay
						onChange={setDay}
					/>
				</nav>
				<img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
			</section>
			<section className='schedule'>
				{/* using help fn to return the array of appointments */}
				{getAppointmentsForDay(state, state.day).map(({ id, time, interview }) => {
					const interviewDetails = getInterview(state, interview);
					return <Appointment key={id} time={time} interview={interviewDetails} />;
				})}
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	);
}

////////////////////////////////////////////////////////////////////////////////////
//  Using useState to update the setDay fn, since it accepts (day.name) as argument,
//  it can be simple as: setDay={setSelectedDay}
//
//  setDay={(name) => {
//		setSelectedDay(name);
//	}}
////////////////////////////////////////////////////////////////////////////////////
