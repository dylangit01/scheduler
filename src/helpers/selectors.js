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

	// find the day with interviewers
	const foundDay = daysCopy.find((eachDay) => eachDay.name === day);
	if (!foundDay) return [];
	return foundDay.interviewers.map(interviewId => (
		interviewersCopy[interviewId]
	))
};

export const getInterview = (state, interview) => {
	if (!interview) return null;
	const interviewersCopy = { ...state.interviewers };

	for (const key in interviewersCopy) {
		if (interview.interviewer === interviewersCopy[key].id) {
			// interviewer will overwrite original interviewer data
			return { ...interview, interviewer: interviewersCopy[key] };
		}
	}
	// If no match, return null
	return null;
};
