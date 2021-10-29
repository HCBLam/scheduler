

export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(currentDay => currentDay.name === day);

  if (!selectedDay || state.days.length === 0) return [];

  const selectedAppointments = selectedDay.appointments.map(id => state.appointments[id]);

  return selectedAppointments;
};

