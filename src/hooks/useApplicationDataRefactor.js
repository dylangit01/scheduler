import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from './constant';
import reducer from './reducer';

const useApplicationDataRefactor = () => {
	// INITIAL DATA
	const [state, dispatch] = useReducer(reducer, {
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	// Dispatch day
	const setDay = day => dispatch({type: SET_DAY, day})

	// MAKE SERVER CALL
	useEffect(() => {
		const ENDPOINT_DAY = '/api/days';
		const ENDPOINT_APPOINTMENTS = '/api/appointments';
		const ENDPOINT_INTERVIEWERS = '/api/interviewers';

		Promise.all([
			axios.get(ENDPOINT_DAY),
			axios.get(ENDPOINT_APPOINTMENTS),
			axios.get(ENDPOINT_INTERVIEWERS)])
			.then(all => {
				const [days, appointments, interviewers] = all;
				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				});
			}
		);
	}, []);
	
		const foundSpotsHelper = () => {
			// confirm available spots:
			const foundDay = state.days.find((eachDay) => eachDay.name === state.day);
			let availableSpots = 0;
			if (!foundDay) {
				availableSpots = 5;
			} else {
				availableSpots = foundDay.appointments.filter(
					(appointmentId) => state.appointments[appointmentId].interview === null
				).length;
			}
			return availableSpots;
		};

	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const remainSpots = foundSpotsHelper() - 1;

		let days = state.days.map((eachDay) => {
			return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainSpots } : eachDay;
		});

		dispatch({ type: SET_INTERVIEW, id, interview, appointments, days });
		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
	};

	const cancelInterview = (id) => {
			const appointment = {
				...state.appointments[id],
				interview: null,
			};

			const appointments = {
				...state.appointments,
				[id]: appointment,
			};

		const remainSpots = foundSpotsHelper() + 1;
		let days = state.days.map((eachDay) => {
			return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainSpots } : eachDay;
		});

		dispatch({ type: SET_INTERVIEW, id, interview:null, appointments, days });
		return axios.delete(`http://localhost:8001/api/appointments/${id}`)
			
	};
	return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationDataRefactor;
