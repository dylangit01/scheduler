import React from 'react';
import './InterviewerListItem.scss';

// import classnames library:
import classnames from 'classnames';

const InterviewerListItem = ({ name, avatar, selected, setInterviewer }) => {
	const interviewListClass = classnames('interviewers__item', {
		'interviewers__item--selected': selected, // selected is a boolean value passed from InterViewList
	});

	return (
		<li className={interviewListClass} onClick={setInterviewer}>
			{/* no need to pass the id in onClick fn as InterviewerList already setup id within the fn */}
			<img className='interviewers__item-image' src={avatar} alt={name} />
			{selected && name}
		</li>
	);
};

export default InterviewerListItem;
