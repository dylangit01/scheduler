import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button'

const Form = ({name, interviewers, interviewer, setInterviewer }) => {
	
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
						
					/>
				</form>
				<InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
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
