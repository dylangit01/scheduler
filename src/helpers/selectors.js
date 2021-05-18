export const getAppointmentsForDay = (state, day) => {
	const daysCopy = [...state.days];
	const appointmentsCopy = { ...state.appointments };

	// find the day with interviewers
	const foundDay = daysCopy.find((eachDay) => eachDay.name === day);
	if (!foundDay) return [];
	return foundDay.appointments.map((appointmentId) => appointmentsCopy[appointmentId]);
};

export const getInterviewersForDay = (state, day) => {
	const daysCopy = [...state.days];
	const interviewersCopy = { ...state.interviewers };

	const foundDay = daysCopy.find((eachDay) => eachDay.name === day);
	if (!foundDay) return [];
	return foundDay.interviewers.map((interviewId) => interviewersCopy[interviewId]);
};

// Update interview object for SHOW and FORM components
export const getInterview = (state, interview) => {
	if (!interview) return null;
	// using interview to update the interview object directly
	return {
		...interview,
		interviewer: state.interviewers[interview.interviewer],
	};
};










/*
	for (const key in interviewersCopy) {
		if (interview.interviewer === interviewersCopy[key].id) {
			// interviewer will overwrite original interviewer data (student's name will be unchanged by using "...interview")
			return { ...interview, interviewer: interviewersCopy[key] };
		}
	}
*/
