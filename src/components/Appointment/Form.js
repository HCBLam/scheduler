import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.value || null);

  const reset = function() {
    setStudent('');
    setInterviewer(null)
  }
  const cancel = function() {
    reset();
    props.onCancel()
  }

  // I need to reassign interviewer to value because that's the name of the prop being called in InterviewerList due to the refactor
  const value = interviewer;

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
        />
      </form>
      <InterviewerList
        interviewers={props.interviewers}
        value={value}
        onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
      </section>
    </section>
  </main>
  )
};
