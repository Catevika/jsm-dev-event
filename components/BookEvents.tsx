'use client';
import {createBooking} from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';
import {useState} from 'react';

type BookEventsProps = {
	eventId: string;
	slug: string;
};

const BookEvents = ({eventId, slug}: BookEventsProps) => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async () => {
		const {success} = await createBooking({eventId, slug, email});
		if (success) {
			setSubmitted(true);
			posthog.capture('event_booked', {eventId, slug, email});
		} else {
			console.error('Booking creation failed');
			posthog.captureException('Booking creation failed');
		}
	};

	return (
		<div id='book-event'>
			{submitted ? (
				<p className='text-sm'>Thank you for signing up!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='email'>Email:</label>
						<input
							type='email'
							id='email'
							value={email}
							placeholder='Enter your email address'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='button-submit'>
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default BookEvents;
