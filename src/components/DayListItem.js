import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, setDay, selected } = props;
  const classConfig = {
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  }
  const dayClass = classNames(classConfig);

  function formatSpots(num) {
    if (num === 0) {
      return 'no spots';
    }

    if (num === 1) {
      return '1 spot';
    } 

    return `${num} spots`;
  }
  
  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
}