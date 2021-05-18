import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from './constant';

const reducer = (state, action) => {
	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers };
		case SET_INTERVIEW:
			return { ...state, days: action.days, appointments: action.appointments };
			
		default:
			throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
	}
};

export default reducer;
