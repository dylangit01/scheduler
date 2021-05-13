import { useState } from 'react';
// Here, mode is the different page in appointment directory
export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (mode, replace = false) {
		if (replace) {
			setHistory([history.pop(), ...history, mode]);
			setMode(mode);
		} else {
			setMode(mode);
			setHistory([...history, mode]);
		}
	};

	const back = function () {
		if (history.length > 1) {
			// history.pop();			// Is this bed practice for pop history directly?
			setHistory([history.pop(), ...history]);
			setMode(history[history.length - 1]);
		}
	};

	return { mode, transition, back };
}
