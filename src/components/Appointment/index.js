//Utilities
import React from 'react';
//Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
//helpers and hooks
import useVisualMode from 'hooks/useVisualMode';
//style
import "./styles.scss";

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { id, time, interview, interviewers, bookInterview, deleteInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  function askDelete() {
    transition(CONFIRM);
  }

  function runDelete() {
    transition(DELETING);
    deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      });
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { mode === SHOW && 
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={askDelete} 
        /> }
      { mode === EMPTY && 
        <Empty 
          onAdd={() =>transition(CREATE)}
        /> }
      { mode === CREATE && 
        <Form 
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        /> }
      { mode === SAVING &&
        <Status 
          message={SAVING}
        />
      }
      { mode === DELETING &&
        <Status 
          message={DELETING}
        />
      }
      { mode === CONFIRM &&
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={runDelete}
        />
      }
    </article>
  );
}