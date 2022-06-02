//Utilities
import React from 'react';
//Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
//helpers and hooks
import useVisualMode from 'hooks/useVisualMode';
//style
import "./styles.scss";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      { mode === SHOW && <Show 
        student={interview.student}
        interviewer={interview.interviewer} 
        /> }
      { mode === EMPTY && <Empty 
        onAdd={() =>transition(CREATE)}
        /> }
      { mode === CREATE && <Form 
        interviewers={interviewers}
        onCancel={back}
        />}
    </article>
  );
}