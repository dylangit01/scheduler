import React from "react";
import "components/Button.scss";

// import classnames library:
import classnames from 'classnames';

export default function Button({ confirm, danger, children, onClick, disabled }) {
	// without className library
	// let buttonClass = 'button';
	// buttonClass += ` button--${danger ? 'danger' : confirm && 'confirm'}`

	// with className library
	const buttonClass = classnames('button', {
		'button--confirm': confirm,
		'button--danger': danger,
	});

	return (
		<button disabled={disabled} onClick={onClick} className={buttonClass}>
			{children}
		</button>
	);
}