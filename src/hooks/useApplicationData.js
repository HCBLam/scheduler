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

    const day = state.days.find(date => date.name === state.day);

    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];

      if (!appointment.interview) {
        spots++;
      }
    };

    const newDay = {...day, spots};
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
      // console.log('all: ===> ', all)
      // console.log('Days: ===> ', all[0].data);
      // console.log('Appointments: ===> ', all[1].data);
      // console.log('Interviewers: ===> ', all[2].data);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, [])


  return { state, setDay, bookInterview, cancelInterview };
}

