import React from 'react';

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem (props) {
  const { id, name, avatar, setInterviewer, selected } = props;
  const classConfig = {
    "interviewers__item-image": true,
    "interviewers__item--selected": selected
  };

  return (
    <li className="interviewers__item" onClick={() => setInterviewer(id)}>
      <img
        className={classNames(classConfig)}
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}