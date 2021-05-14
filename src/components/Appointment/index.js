import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import './styles.scss';
import useVisualMode from '../../hooks/useVisualMode';

const Appointment = ({ interviewers, interview, time, bookInterview, id }) => {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';

	// Whenever use custom Hook, destructuring its properties first:
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	// create save function to pass down to Form
	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		setTimeout(() => {
			bookInterview(id, interview);
			transition(SHOW);
		}, 1000);
	};

	return (
		<article className='appointment'>
			<Header time={time} />
			{/* cannot use ternary operator as more two views */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
			{mode === CREATE && (
				<Form interviewers={interviewers} onSave={save} onCancel={() => back()} /> // Use the back function to return to the EMPTY state when the cancel btn is clicked.
			)}
			{mode === SAVING && <Status message='saving' />}
		</article>
	);
};

export default Appointment;
