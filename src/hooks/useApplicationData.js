import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateSpots = function(state, appointments, id) {

    // Find the selected day object
    const day = state.days.find(date => date.name === state.day);

    let spots = 0;

    // Iterate through the day's appointments by id
    for (const id of day.appointments) {
      const appointment = appointments[id];

      // If the appointment does not have an interview, increment spots available
      if (!appointment.interview) {
        spots++;
      }
    };

    // Update the day object with the new spots value
    const newDay = {...day, spots};

    // Update the days array with the updated day object
    const newDays = state.days.map(date => date.name === state.day ? newDay : date);
    return newDays;
  };

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(res => {
      setState({ ...state, appointments, days: updateSpots(state, appointments, id)})

    })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments, days: updateSpots(state, appointments, id)})
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
};

