import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
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
	return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;