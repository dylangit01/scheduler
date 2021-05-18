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

		// let tempInterviewers = {};
		// let tempAppointments = {};
		// let tempDays = [];

		Promise.all([
			axios.get(ENDPOINT_DAY),
			axios.get(ENDPOINT_APPOINTMENTS),
			axios.get(ENDPOINT_INTERVIEWERS)])
			.then(
			(all) => {
				const [days, appointments, interviewers] = all;

				// tempInterviewers = interviewers.data;
				// tempAppointments = appointments.data;
				// tempDays = days.data;

				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				});
			}
		);

		// Websocket part
		// const socket = new WebSocket('ws://localhost:8001');
		// socket.onopen = function (event) {
		// 	socket.send('ping');
		// };

		// socket.onmessage = function (event) {
		// 	const data = JSON.parse(event.data);
		// 	if (data.type === 'SET_INTERVIEW') {
		// 		// data.interview.interviewer = tempInterviewers[data.interview.interviewer];
		// 		delete data.type;

		// 		const appointment = { ...tempAppointments[data.id], interview: { ...data.interview } };
		// 		const appointments = { ...tempAppointments, [data.id]: appointment };

		// 		// spots
		// 		const foundDay = tempDays.find((eachDay) => eachDay.name === state.day);
		// 		let availableSpots = 5;
		// 		availableSpots = foundDay.appointments.filter(
		// 			(appointmentId) => tempAppointments[appointmentId].interview === null
		// 		).length;

		// 		const remainingSpots = availableSpots - 1;

		// 		let days = tempDays.map((eachDay) => {
		// 			return eachDay.appointments.includes(data.id) ? { ...eachDay, spots: remainingSpots } : eachDay;
		// 		});

		// 		dispatch({ type: SET_INTERVIEW, appointments, days });
		// 	}
		// };
	}, []);

	const updateSpots = (days, appointments, id) => {
		// Function that finds the number of spots remaining for a given day
		const foundDay = days.find((eachDay) => eachDay.name === state.day);

		const remainingSpots = foundDay.appointments.filter(
			(appointmentId) => appointments[appointmentId].interview === null
		).length;

		// Fancy way to get remaining Spots:
		// const getRemainingSpots = (day) => {
		// 	const remainingSpots = day.appointments.reduce((accSpots, currAppId) => {
		// 		if (appointments[currAppId].interview === null) accSpots++;
		// 		return accSpots;
		// 	}, 0);
		// 	return remainingSpots;
		// }

		const updatedDays = days.map((eachDay) => {
			return eachDay.appointments.includes(id) ? { ...eachDay, spots: remainingSpots } : eachDay;
		});

		return updatedDays;
	};

	const bookInterview = (id, interview) => {
		const appointment = { ...state.appointments[id], interview: { ...interview } };
		const appointments = { ...state.appointments, [id]: appointment };

		const days = updateSpots(state.days, appointments, id);

		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => dispatch({ type: SET_INTERVIEW, appointments, days }));
	};

	const cancelInterview = (id) => {
		const appointment = { ...state.appointments[id], interview: null };
		const appointments = { ...state.appointments, [id]: appointment };

		const days = updateSpots(state.days, appointments, id);

		// only dispatch when request is successfully sent
		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => dispatch({ type: SET_INTERVIEW, appointments, days }))
			.catch((err) => {
				throw new Error(err);
			});
	};
	return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationDataRefactor;
