import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = ({ interviewers, interviewer, setInterviewer }) => {
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>

				{/* Remember setInterviewer fn is triggered in ListItem component with proper id, so we need to pass down the id,
						but instead of passing setInterviewer fn as prop to ListItem, we can create call back fn with the id, 
						so we no longer need to pass the id down to ListItem component.  */}
				{[...interviewers].map(({ id, name, avatar }) => (
					<InterviewerListItem
						key={id}
						name={name}
						avatar={avatar}
						selected={id === interviewer}
						setInterviewer={(e) => setInterviewer(id)}
					/>
				))}
			</ul>
		</section>
	);
};

export default InterviewerList;
