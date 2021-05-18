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
	getByDisplayValue,
} from '@testing-library/react';

import axios from 'axios';

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
		const { container, debug } = render(<Application />); // 1. Render the Application
		await waitForElement(() => getByText(container, 'Archie Cohen')); // 2. Wait until the text "Archie Cohen" is displayed.

		// find the article with the appointment test id that has the name "Archie Cohen".
		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(getByAltText(appointment, 'Delete')); // 3. Click the "Delete" button on the booked appointment.

		expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument(); // 4. Check that the confirmation message is shown.

		fireEvent.click(queryByText(appointment, 'Confirm')); // 5. Click the "Confirm" button on the confirmation.

		expect(getByText(appointment, 'Deleting')).toBeInTheDocument(); // 6. Check that the element with the text "Deleting" is displayed.

		await waitForElement(() => getByAltText(appointment, 'Add')); // 7. Wait until the element with the "Add" button is displayed.

		// 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
		expect(getByText(day, '2 spots remaining')).toBeInTheDocument();

		// debug()
	});

	it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
		const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen'));
		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);
		fireEvent.click(getByAltText(appointment, 'Edit'));

		expect(getByDisplayValue(appointment, 'Archie Cohen'));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
		expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));
		expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
	});

	it('shows the save error when failing to save an appointment', async () => {
		axios.put.mockRejectedValueOnce();

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

    await waitForElement(() => getByText(appointment, 'Could not save appointment'));
    
    expect(getByText(appointment, 'Error')).toBeInTheDocument();
  });
  


	it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    
    const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen')); 

		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument(); 
    
    await waitForElement(() => getByText(appointment, 'Could not delete appointment'));

	  expect(getByText(appointment, 'Error')).toBeInTheDocument();

	});
});
