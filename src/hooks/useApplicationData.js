import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    }
  );

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

  const setDay = day => setState({...state, day});

  function countSpotsForDay (dayObj, apptObj) {
    let count = 0;
    for (const apptId of dayObj.appointments) {
      if (!apptObj[apptId].interview) {
        count++;
      }
    }
    return count;
  }

  function updateSpots (state, dayName, appointments) {
    //find the day Object from state.days
    const dayObj = state.days.find(day => day.name === dayName);
    //count the number of appointments with null values
    const spots = countSpotsForDay(dayObj, appointments);

    //copy over an updated day object
    const day = { ...dayObj, spots };
    //substitute that new day object in for the matching name in state.days
    const newDays = state.days.map(d => d.name === dayName ? day : d);

    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, state.day, appointments);
        setState({ ...state, appointments, days})
      });
  }

  function deleteInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, state.day, appointments);
        setState({ ...state, appointments, days})
      });
  }

  return { state, setDay, bookInterview, deleteInterview };
}