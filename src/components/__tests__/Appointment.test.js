// Change the watch mode to p and type in Appointment to only run the Appointment.test.js file after each update
import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';

import Appointment from 'components/Application';

afterEach(cleanup);

describe('Appointment', () => {
	it('defaults to Monday and changes the appointment interview when a new day is selected', async () => {
		const { getByText } = render(<Appointment />);
		await waitForElement(() => getByText('Monday'));
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});
});
