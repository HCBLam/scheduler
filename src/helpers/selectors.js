
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(currentDay => currentDay.name === day);
  if (!selectedDay || state.days.length === 0) return [];
  const selectedAppointments = selectedDay.appointments.map(id => state.appointments[id]);
  return selectedAppointments;
};

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(currentDay => currentDay.name === day);
  if (!selectedDay || state.days.length === 0) return [];
  const selectedInterviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  return selectedInterviewers;
};

export function getInterview(state, interview) {
  if (interview !== null) {
    return {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
};


