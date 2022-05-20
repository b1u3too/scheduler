import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, day, setDay } = props;

  function isSelected(dayName) {
    return day === dayName;
  }

  const renderedDays = days.map((oneDay) => {
    return (
      <DayListItem 
        key={oneDay.id}
        name={oneDay.name}
        spots={oneDay.spots}
        selected={isSelected(oneDay.name)}
        setDay={setDay}
      />
    ); 
  })

  return (
    <ul>
      {renderedDays}
    </ul>
  );
}