import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "./helpers/selectors";

import "components/Application.scss";
import DayList from "components/DayList";

function renderAppointments(aptArry) {
  
  return aptArry.map((appointment) => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment} />
    );
  });
}

export default function Application(props) {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {}
    }
  );

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments")
    ])
      .then(res => {
        setState(prev => ({
          ...prev, 
          days: res[0].data, 
          appointments: res[1].data}));
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
        {renderAppointments(getAppointmentsForDay(state, state.day))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
