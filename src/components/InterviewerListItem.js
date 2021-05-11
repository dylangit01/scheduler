import React from 'react';
import './InterviewerListItem.scss';

// import classnames library:
import classnames from 'classnames';

const InterviewerListItem = ({ id, name, avatar, selected, setInterviewer }) => {

	const interviewListClass = classnames('interviewers__item', {
		'interviewers__item--selected': selected // selected is a boolean value passed from InterViewList
	});

	return (
		<li className={interviewListClass} onClick={() => setInterviewer(name)}>
			<img className='interviewers__item-image' src={avatar} alt={name} />
			{selected && name}
		</li>
	);
};

export default InterviewerListItem;
