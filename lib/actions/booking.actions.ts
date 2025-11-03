'use server';
import Booking from '@/database/booking.model';
import connectDB from '../mongodb';

export async function createBooking({
	eventId,
	slug,
	email,
}: {
	eventId: string;
	slug: string;
	email: string;
}) {
	try {
		await connectDB();

		await Booking.create({
			eventId,
			slug,
			email,
		});

		return {success: true};
	} catch (err) {
		console.error('Create booking failed');
		return {
			success: false,
		};
	}
}
