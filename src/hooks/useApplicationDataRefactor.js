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

		Promise.all([axios.get(ENDPOINT_DAY), axios.get(ENDPOINT_APPOINTMENTS), axios.get(ENDPOINT_INTERVIEWERS)]).then(
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

		// WEBSOCKET
		const socket = new WebSocket('wss://interview-app-scheduler.herokuapp.com/');

		socket.onopen = function (event) {
			socket.send('ping');
		};

		socket.onmessage = function (event) {
			const data = JSON.parse(event.data);
			// Send dispatch to update state ONLY when data.type === 'SET_INTERVIEW'
			if (data.type === 'SET_INTERVIEW') {
				dispatch(data);
			}
			// dispatch({type: 'SET_INTERVIEW', id: data.id})				//---> shows error
		};
	}, []);

	const bookInterview = (id, interview) => {
		return axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => dispatch({ type: SET_INTERVIEW, id, interview }));
	};

	const cancelInterview = (id) => {
		return axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => dispatch({ type: SET_INTERVIEW, id, interview:null }))
			.catch((err) => {
				throw new Error(err);
			});
	};
	return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationDataRefactor;
