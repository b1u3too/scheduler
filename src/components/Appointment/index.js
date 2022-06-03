//Utilities
import React from 'react';
//Components
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
//helpers and hooks
import useVisualMode from 'hooks/useVisualMode';
//style
import "./styles.scss";

export default function Appointment (props) {  
  const { id, time, interview, interviewers, bookInterview, deleteInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  }

  function askDelete() {
    transition(CONFIRM);
  }

  function runDelete() {
    transition(DELETING, true);
    deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { 
        mode === SHOW && 
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={askDelete} 
          onEdit={() => transition(EDIT)}
        /> }
      { 
        mode === EMPTY && 
        <Empty 
          onAdd={() =>transition(CREATE)}
        /> }
      { 
        mode === CREATE && 
        <Form 
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        /> }
      { 
        mode === SAVING &&
        <Status 
          message={SAVING}
        />
      }
      { 
        mode === DELETING &&
        <Status 
          message={DELETING}
        />
      }
      { 
        mode === CONFIRM &&
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={runDelete}
        />
      }
      {
        mode === EDIT &&
        <Form 
          student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {
        mode === ERROR_SAVE &&
        <Error 
          message="Could not save appointment."
          onClose={back}
        />
      }
      {
        mode === ERROR_DELETE &&
        <Error 
          message="Could not cancel appointment."
          onClose={back}
        />
      }
    </article>
  );
}