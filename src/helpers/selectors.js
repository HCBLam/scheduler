

export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(currentDay => currentDay.name === day);

  if (!selectedDay || state.days.length === 0) return [];

  const selectedAppointments = selectedDay.appointments.map(id => state.appointments[id]);

  return selectedAppointments;
};



export function getInterview(state, interview) {

  if (interview !== null) {
    // console.log('interview.interviewer: =====> ', interview.interviewer)
    // console.log('interviewer object: =====> ', state.interviewers[interview.interviewer])
    return {...interview, interviewer: state.interviewers[interview.interviewer]};
  }

  return null;


}