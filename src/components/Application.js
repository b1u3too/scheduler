import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "./helpers/selectors";

import "components/Application.scss";
import DayList from "components/DayList";

export default function Application(props) {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

  const setDay = day => setState({...state, day});
  const appointments = getAppointmentsForDay(state, state.day);
  const renderedAppointments = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(res => {
        setState(prev => ({
          ...prev, 
          days: res[0].data, 
          appointments: res[1].data,
          interviewers: res[2].data}));
      })
      .catch(err => console.log(err.message));
  }, []);


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
        {renderedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
