"use server";
import Booking from "@/database/booking.model";
import Event from "@/database/event.model";
import connectDB from "../mongodb";
import Error from "next/error";

export async function createBooking({
	eventId,
	slug,
	email
}: {
	eventId: string;
	slug: string;
	email: string;
}) {
	try {
		await connectDB();

		// 1. Validate event exists
		const eventExists = await Event.findById(eventId).select("_id");
		if (!eventExists) {
			return {
				success: false,
				error: `Event with ID ${eventId} does not exist`
			};
		}

		// 2. Create booking
		const booking = await Booking.create({
			eventId,
			slug,
			email
		});

		return {
			success: true,
			bookingId: booking._id
		};
	} catch (err) {
		console.error(err, "Create booking failed");

		return {
			success: false,
			error: "Create booking failed"
		};
	}
}
