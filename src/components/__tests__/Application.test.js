import React from 'react';
import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
	it('changes the schedule when a new day is selected', async () => {
		// destructuring Application component to {getByText}
		const { getByText } = render(<Application />);

		/* Promise regular
    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
    */

		/* Promise Async/Await
      The asynchronous function has been defined as one using the async keyword.
      The Promise chain can be hidden by using the await keyword.
    */

		await waitForElement(() => getByText('Monday'));
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);
    
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' },
		});
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // 'Saving' is an async process, has to wait for the text 
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();
    
    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
	});
});
