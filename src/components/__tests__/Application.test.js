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
		const { container, debug } = render(<Application />); // 1. Render the Application.

		await waitForElement(() => getByText(container, 'Archie Cohen')); // 2. Wait until the text "Archie Cohen" is displayed.

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add')); // 3. Click the "Add" button on the first empty appointment.
    
		// 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
		});
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer')); // 5. Click the first interviewer in the list.
    
		fireEvent.click(getByText(appointment, 'Save')); // 6. Click the "Save" button on that same appointment.
    
		expect(getByText(appointment, 'Saving')).toBeInTheDocument(); // 7. Check that the element with the text "Saving" is displayed.
    
		// 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
		await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
		expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();
    
		// 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
		expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });
  
  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
		const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(getByAltText(appointment, 'Delete'));

		expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    
    await waitForElement(() => getByAltText(appointment, 'Add'));

    const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
		expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
	});






















});
