import React from 'react';
import DayList from './DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData'

import 'components/Application.scss';

export default function Application(props) {

	const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

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
