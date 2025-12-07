"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

// Define LeanEvent type (adjust fields as needed)
export interface LeanEvent {
	_id: string;
	title: string;
	slug: string;
	image: string;
	tags: string[];
	date: string;
	mode: string;
}

export const getSimilarEventsBySlug = async (
	slug: string
): Promise<LeanEvent[]> => {
	try {
		await connectDB();

		// Find base event
		const event = await Event.findOne({ slug }).lean();

		if (!event) {
			return [];
		}

		// Find similar events by tags (exclude current event)
		const similarEvents = await Event.find({
			slug: { $ne: slug },
			tags: { $in: event.tags || [] }
		})
			.select("title slug image tags date mode")
			.lean<LeanEvent[]>();

		return similarEvents;
	} catch (error) {
		console.error("Get similar events failed:", error);
		return [];
	}
};
