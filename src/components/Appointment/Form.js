import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
	const [name, setName] = useState(props.name || '');
	const [interviewer, setInterviewer] = useState(props.value || null);
	const [error, setError] = useState('');

	// Resetting inputs
	const reset = () => {
		setName('');
		setError('')
		setInterviewer(null);
	};

	// Save new interview
	const validate = () => {
		if (name === '') {
			setError('Student name cannot be blank!');
			return;
		}
		else if (interviewer === null) {
			setError('An interviewer must be selected');
			return;
		}
		reset();
		props.onSave(name, interviewer);
	};

	// const save = () => {
	// 	props.onSave(name, interviewer);
	// 	reset();
	// };

	// Cancel fn
	const cancel = () => {
		props.onCancel();
		reset();
	};

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				{/* Form component is the parent component that passes down interviewer to InterviewList component 
						and value is from Appointment component, it can be edited in Form component */}
				<form autoComplete='off' onSubmit={(e) => e.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						data-testid='student-name-input'
					/>
					<section className='appointment__validation'>{error}</section>
				</form>

				{/* InterviewList component using generic name onChange to pass down the setInterviewer fn 
						to InterviewListItem component, and it will return back the setInterviewer value to save function 
						which receive name and interviewer two arguments, name is created by input tag					
						*/}
				<InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button onClick={cancel} danger>
						Cancel
					</Button>
					<Button onClick={validate} confirm>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
