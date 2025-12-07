"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

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
