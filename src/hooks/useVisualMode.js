import { useState } from 'react';
// Here, mode is the different page in appointment directory
export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	const transition = function (mode, replace = false) {
		if (replace) {
			// const temp = history.slice(0, -1)
			// setHistory([history.pop()]);
			setMode(mode);
		} else {
			setMode(mode);
			setHistory([...history, mode]);
		}
	};

	const back = function() {
		if (history.length > 1) {
			let temp = history.slice(0, -1);
			setHistory(temp);
			setMode(temp[temp.length - 1]);
		}
	};

	return { mode, transition, back };
}


// if (replace) {
// 	setMode(mode)
// } else {
// 	setHistory([...history, mode]);
// 	setMode(mode);
// }

// if (history.length > 1) {
// 	setHistory(history.slice(0, -1))
// 	setMode(history[history.length - 2])
// }