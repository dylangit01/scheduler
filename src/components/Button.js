import React from "react";

import "components/Button.scss";

export default function Button({ children, onClick, disabled }) {
	let buttonClass = 'button';
	if (children) {
		buttonClass += ` button--${children === 'Cancel' ? 'danger' : children.toLowerCase()}`;
	}

	return (
		<button disabled={disabled} onClick={onClick} className={buttonClass}>
			{children}
		</button>
	);
}
