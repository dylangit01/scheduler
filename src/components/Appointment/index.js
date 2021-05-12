import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './styles.scss';

const Appointment = ({ interview, time }) => {
	return (
		<article className='appointment'>
			<Header time={time} />
			{interview ? 
			<Show student={interview.student} interviewer={interview.interviewer} /> 
			: 
			<Empty />}
		</article>
	);
};

export default Appointment;
