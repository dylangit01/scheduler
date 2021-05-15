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
	const setDay = (day) => dispatch({ type: SET_DAY, day });

	// MAKE SERVER CALL
	useEffect(() => {
		const ENDPOINT_DAY = '/api/days';
		const ENDPOINT_APPOINTMENTS = '/api/appointments';
		const ENDPOINT_INTERVIEWERS = '/api/interviewers';

		Promise.all([
			axios.get(ENDPOINT_DAY),
			axios.get(ENDPOINT_APPOINTMENTS),
			axios.get(ENDPOINT_INTERVIEWERS)]).then(
			(all) => {
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

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8001');

		// const message = {
		// 	type: 'SET_INTERVIEW',
		// 	id,
		// 	interview: {
		// 		student,
		// 		interviewer: {
		// 			id,
		// 			name,
		// 			avatar,
		// 		},
		// 	},
		// };

		socket.onopen = function (event) {
			socket.send('ping');
		};

		socket.onmessage = function (event) {
			console.log(event.data);
		};

		// return socket.close();
	}, []);

	// update spots helper fn
	const spotsHelper = () => {
		// confirm available spots:
		const foundDay = state.days.find((eachDay) => eachDay.name === state.day);
		let availableSpots = 5;
			availableSpots = foundDay.appointments.filter(
				(appointmentId) => state.appointments[appointmentId].interview === null
			).length;
		return availableSpots;
	};

	const bookInterview = (id, interview) => {
		const appointment = { ...state.appointments[id], interview: { ...interview } };
		const appointments = { ...state.appointments, [id]: appointment };

		const remainingSpots = spotsHelper() - 1;

		// update the foundDay's spots
		let days = state.days.map((eachDay) => {
			return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainingSpots } : eachDay;
		});

		dispatch({ type: SET_INTERVIEW, appointments, days });
		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });
	};

	const cancelInterview = (id) => {
		const appointment = { ...state.appointments[id], interview: null };
		const appointments = { ...state.appointments, [id]: appointment };

		const remainingSpots = spotsHelper() + 1;
		let days = state.days.map((eachDay) => {
			return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainingSpots } : eachDay;
		});

		// only dispatch when request is successfully sent
		return axios.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
			.catch((err)=>{ throw new Error(err)})
	};
	return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationDataRefactor;
