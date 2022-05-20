import React from 'react';

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem (props) {
  const { id, name, avatar, setInterviewer, selected } = props;
  const classConfig = {
    "interviewers__item": true,
    "interviewers__item--selected": selected
  };

  return (
    <li className={classNames(classConfig)} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}