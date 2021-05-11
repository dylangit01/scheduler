import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

// In List component, we are using very generic name: "value" and "onChange" to represent the interviewer and setInterviewer fn
// So if any interviewer as the value passed down from parent component (say app.js), as long as this value equals to onChange value, 
// the List component can compare the selected item to the current id and set the value to true when they match.
const InterviewerList = ({ interviewers, value, onChange }) => {	
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
						// destructuring interviewer
						{...{ name, avatar }}
						selected={id === value} // the value is the value in stories
						setInterviewer={(e) => onChange(id)}
					/>
				))}
			</ul>
		</section>
	);
};

export default InterviewerList;
