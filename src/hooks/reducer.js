import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from './constant';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
		case SET_INTERVIEW: // UPDATE THE SINGLE SOURCE OF STATE DATA IN REDUCER, ID AND INTERVIEW ALL COME FROM DISPATCH ACTION
			
			// ONLY UPDATE INTERVIEW WHEN ACTION.INTERVIEW IS TRUE, OTHERWISE WHEN CANCEL APPOINTMENT WILL CAUSE ERROR
			const appointment = { ...state.appointments[action.id], interview: action.interview && { ...action.interview } };
			const appointments = { ...state.appointments, [action.id]: appointment };

			// UPDATE SPOTS
			const updateSpots = function (days, appointments, id) {
				// Function that finds the number of spots remaining for a given day
				// const foundDay = days.find((eachDay) => eachDay.name === state.day);			//--> cannot use state.day as websocket will fail;

				// Find the current day to update the spots
				let foundDay = null;
				days.forEach(day => {
					day.appointments.forEach(appointmentId => {
						if (appointmentId === id) {
							foundDay = day;
						}
					});
				});

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

			const days = updateSpots(state.days, appointments, action.id);

			// RETURN UPDATED DAYS AND APPOINTMENTS FOR ALL COMPONENTS
			return { ...state, days, appointments };
		default:
			throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
	}
};

export default reducer;
