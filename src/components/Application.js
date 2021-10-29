import React, {useState, useEffect} from "react";
import "components/Application.scss";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  },
  {
    id: 6,
    time: "5pm",
  }
];



export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  // const setAppointments = appointments => setState({ ...state, appointments });

  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);

  const appointmentSchedule = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)

  useEffect(() => {
    axios
    .get('/api/days')
    .then(response => {
      // console.log('Days Response --------> ', response);
      setDays([...response.data]);
    })
  }, [])

  // useEffect(() => {
  //   axios
  //   .get('/api/appointments')
  //   .then(response => {
  //     console.log('Appointment Response ----------> ', response.data);
  //     setAppointments([...response.data]);
  //   })
  // }, [])

  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentSchedule}
      </section>

    </main>
  );
}
