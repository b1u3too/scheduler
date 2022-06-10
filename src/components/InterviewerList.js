import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from './InterviewerListItem';

import "components/InterviewerList.scss";

export default function InterviewerList (props) {
  const { interviewers, value, onChange } = props;
  
  function isSelected(idNum){
    return idNum === value;
  }

  const renderedInterviewers = interviewers.map(single => {
    return (
      <InterviewerListItem 
        key={single.id}
        name={single.name}
        avatar={single.avatar}
        selected={isSelected(single.id)}
        setInterviewer={(event) => onChange(single.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {renderedInterviewers}
      </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};