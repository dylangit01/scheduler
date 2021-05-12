export const getAppointmentsForDay = (state, day) => {
	// Make copy for day and appointments
	const daysCopy = [...state.days];
	const appointmentsCopy = { ...state.appointments };

	const result = [];
	// find the day with appointments
	const filteredDay = daysCopy.filter((eachDay) => eachDay.name === day);
	// if given day doesn't have appointment, then return [];
	const appointmentIds = filteredDay.length !== 0 ? filteredDay[0].appointments : [];

	for (const idKey in appointmentsCopy) {
		if (appointmentIds.includes(Number(idKey))) {
			result.push(appointmentsCopy[idKey]);
		}
	}
	// when the day is not found, return original result []
	return result;
}