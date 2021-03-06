import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import './styles.scss';
import useVisualMode from '../../hooks/useVisualMode';

const Appointment = ({ interviewers, interview, time, bookInterview, id, cancelInterview }) => {
	const EMPTY = 'EMPTY';
	const SHOW = 'SHOW';
	const CREATE = 'CREATE';
	const SAVING = 'SAVING';
	const DELETE = 'DELETE';
	const CONFIRM = 'CONFIRM';
	const EDIT = 'EDIT';
	const ERROR_SAVE = 'ERROR_SAVE';
	const ERROR_DELETE = 'ERROR_DELETE';

	// Using custom Hook
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	/*
	Below useEffect is used for Websocket showing correct visual page
	1. load the page
	2. appointment component -> receive an interview
	3. if the interview is null, visual mode is going to be empty
	4. somebody else added an interview
	5. with the socket connection, this appointment component now has the interview
	6. if this component ever receives an interview (that is not null) but it is in the empty mode, change it to the show mode
	*/

	React.useEffect(() => {
		if (interview && mode === EMPTY) {
			transition(SHOW);
		}
		if (interview === null && mode === SHOW) {
			transition(EMPTY);
		}
	}, [interview, transition, mode]);

	// create save function to pass down to Form
	const save = (name, interviewer) => {
		// save fn is in Form component to create or update current appointment with name and interviewer,
		// and they will be update by using bookInterview fn
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		bookInterview(id, interview)
			.then(() => transition(SHOW))
			.catch(() => transition(ERROR_SAVE, true));
	};

	const onDelete = () => {
		// transition needs add second argument to back to EMPTY page
		transition(DELETE, true);
		cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE, true));
	};

	// const onClose = () => {
	// 	mode === ERROR_SAVE && transition(EMPTY);
	// 	mode === ERROR_DELETE && transition(SHOW)
	// }

	return (
		<article className='appointment' data-testid='appointment'>
			<Header time={time} />
			{/* cannot use ternary operator as more two views */}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && interview && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}

			{mode === CREATE && (
				<Form interviewers={interviewers} onSave={save} onCancel={back} /> // Use the back function to return to the EMPTY state when the cancel btn is clicked.
			)}

			{mode === EDIT && (
				<Form
					interviewers={interviewers}
					value={interview.interviewer.id}
					name={interview.student}
					onSave={save}
					onCancel={back}
				/>
			)}

			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you would like to delete?'
					onConfirm={onDelete}
					onCancel={back}
				/>
			)}
			{mode === SAVING && <Status message='Saving' />}
			{mode === DELETE && <Status message='Deleting' />}
			{mode === ERROR_SAVE && <Error message='Could not save appointment' onClose={back} />}
			{mode === ERROR_DELETE && <Error message='Could not delete appointment' onClose={back} />}
		</article>
	);
};

export default Appointment;
