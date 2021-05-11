import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button'

const Form = (props) => {
	const [name, setName] = useState(props.name || '');
	const [interviewer, setInterviewer] = useState(props.value || null);
	
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off'>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</form>
				{/* Form component is the parent component who passes down interviewer to InterviewList component 
						But value is from the parent component of Form component, it can be edited in Form component */}
				<InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger>Cancel</Button>
					<Button confirm>Save</Button>
				</section>
			</section>
		</main>
	);
};

export default Form
