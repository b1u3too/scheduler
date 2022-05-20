import React from 'react';
import InterviewerListItem from './InterviewerListItem';

import "components/InterviewerList.scss";

export default function InterviewerList (props) {
  const { interviewers, interviewer, setInterviewer } = props;

  function isSelected(idNum){
    return idNum === interviewer;
  }

  const renderedInterviewers = interviewers.map(single => {
    return (
      <InterviewerListItem 
        id={single.id}
        name={single.name}
        avatar={single.avatar}
        selected={isSelected(single.id)}
        setInterviewer={setInterviewer}
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