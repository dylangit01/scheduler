import { useState } from 'react';
// Here, mode is the different page in appointment directory
export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (mode, replace = false) {
		setMode(mode);
		if (replace) {
			setMode(mode);
			// setHistory([...history]);				// this line is for Double back for ERROR_SAVE
		} else {
			setHistory([...history, mode]);
		}
	};

	const back = function () {
		if (history.length > 1) {
			let temp = history.slice(0, -1);
			setHistory(temp);
			setMode(temp[temp.length - 1]);
		}
	};

	return { mode, transition, back };
}
