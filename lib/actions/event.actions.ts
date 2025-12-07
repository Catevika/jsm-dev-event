"use server";

import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (
	slug: string
): Promise<LeanEvent[]> => {
	try {
		await connectDB();
		const event = await Event.findOne({ slug });

		if (!event) return [];

		const similarEvents = await Event.find({
			slug: { $ne: event.slug },
			tags: { $in: event.tags }
		}).lean<LeanEvent[]>();

		return similarEvents;
	} catch (err) {
		console.log(err);
		return [];
	}
};
