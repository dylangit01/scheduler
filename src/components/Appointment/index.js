import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import './styles.scss';
import useVisualMode from '../../hooks/useVisualMode';

const Appointment = ({ interviewers, interview, time, bookInterview, id, cancelInterview }) => {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';
	const DELETE = 'DELETE';
	const CONFIRM = 'CONFIRM'
	const EDIT = 'EDIT'

	// Whenever use custom Hook, destructuring its properties first:
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	// create save function to pass down to Form
	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		bookInterview(id, interview)
			.then(() => transition(SHOW))
	};

	const onDelete = () => {
		// transition needs add second argument to back to EMPTY page
		transition(DELETE,true)
		cancelInterview(id)
			.then(() => transition(EMPTY))
	};

	return (
		<article className='appointment'>
			<Header time={time} />
			{/* cannot use ternary operator as more two views */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}

			{mode === CREATE && (
				<Form interviewers={interviewers} onSave={save} onCancel={() => back()} /> // Use the back function to return to the EMPTY state when the cancel btn is clicked.
			)}

			{mode === EDIT && (
				<Form
					interviewers={interviewers}
					value={interview.interviewer.id}
					name={interview.student}
					onSave={save}
					onCancel={() => back()}
				/>
			)}

			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you would like to delete?'
					onConfirm={() => onDelete()}
					onCancel={() => back()}
				/>
			)}
			{mode === SAVING && <Status message='Saving' />}
			{mode === DELETE && <Status message='Deleting' />}
		</article>
	);
};

export default Appointment;
