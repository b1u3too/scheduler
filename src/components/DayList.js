import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, value, onChange } = props;

  function isSelected(dayName) {
    return value === dayName;
  }

  const renderedDays = days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={isSelected(day.name)}
        setDay={onChange}
      />
    ); 
  })

  return (
    <ul>
      {renderedDays}
    </ul>
  );
}