import React from 'react';

import "components/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const { id, name, avatar } = props;

  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}