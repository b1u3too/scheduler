export function getAppointmentsForDay(state, day) {
  const results = [];
  const foundDay = state.days.find(entry => entry.name === day);

  if (foundDay) {
    const apptIds = foundDay.appointments
    for (const id of apptIds) {
      results.push(state.appointments[id]);
    }
  }

  return results;
}