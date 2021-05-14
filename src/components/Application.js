import React, { useState, useEffect } from 'react';
import DayList from './DayList';
import Appointment from './Appointment';
import axios from 'axios';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';

import 'components/Application.scss';

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
	// const setDay = (day) => setState((prev) => ({ ...prev, day }));
	const setDay = (day) => setState({ ...state, day });

	// setDays fn will be refactored with fetch appointments fn:
	// const setDays = (days) => setState((prev) => ({ ...prev, days }));		// why useEffect not complain now?

	useEffect(() => {
		const ENDPOINT_DAY = '/api/days';
		const ENDPOINT_APPOINTMENTS = '/api/appointments';
		const ENDPOINT_INTERVIEWERS = '/api/interviewers';

		// using Promise.all to fetch all data from three different endpoints and return them by order
		Promise.all([axios.get(ENDPOINT_DAY), axios.get(ENDPOINT_APPOINTMENTS), axios.get(ENDPOINT_INTERVIEWERS)]).then(
			(all) => {
				const [days, appointments, interviewers] = all;
				// console.log(days.data, appointments.data, interviewers.data);
				setState((prev) => ({
					...prev, // what is the difference without prev: prev can let dependency array not depends solely on days/appointments/reviewers
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				}));
			}
		);
	}, []); //When a component does not have any dependencies, but we only want it to run once, we have to pass useEffect an empty array.

	// create bookInterview to pass down and fetch id & interview data when Form btn saved
	const bookInterview = (id, interview) => {
		const appointment = {
			// replace the current value of the interview key with the new value
			...state.appointments[id],
			interview: { ...interview },
		};

		// update the appointments object by updating single appointment
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		// send axios put request to update the database, and change endpoint to "8001":
		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => setState({ ...state, appointments }));
	};

	const cancelInterview = (id) => {
		console.log(id);
		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => setState({ ...state, appointments }));
	};

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
				{getAppointmentsForDay(state, state.day).map((appointment) => {
					const interview = getInterview(state, appointment.interview);
					const interviewers = getInterviewersForDay(state, state.day);
					return (
						<Appointment
							key={appointment.id}
							{...appointment}
							interview={interview}
							interviewers={interviewers}
							bookInterview={bookInterview}
							cancelInterview={cancelInterview}
						/>
					);
				})}
				<Appointment bookInterview={bookInterview} cancelInterview={cancelInterview} key='last' time='5pm' />
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
