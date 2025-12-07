import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import type { File } from "node:buffer";

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		const formData = await req.formData();

		const eventData = Object.fromEntries(formData.entries());

		const file = formData.get("image") as File | null;
		if (!file) {
			return NextResponse.json(
				{ message: "Image file is required" },
				{ status: 400 }
			);
		}

		const tags = JSON.parse(formData.get("tags") as string) as string[];
		const agenda = JSON.parse(formData.get("agenda") as string) as string[];

		// Upload image to Cloudinary
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const uploadResult = await new Promise<any>((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						resource_type: "image",
						folder: "DevEvent"
					},
					(error, result) => {
						if (error) return reject(error);
						if (!result?.secure_url)
							return reject(new Error("Cloudinary upload failed"));
						resolve(result);
					}
				)
				.end(buffer);
		});

		const eventDataWithImage = {
			...eventData,
			image: uploadResult.secure_url,
			tags,
			agenda
		};

		const createdEvent = await Event.create(eventDataWithImage);

		return NextResponse.json(
			{ message: "Event created successfully", event: createdEvent },
			{ status: 201 }
		);
	} catch (error) {
		console.error("POST /api/events error:", error);
		return NextResponse.json(
			{
				message: "Event creation failed",
				error: error instanceof Error ? error.message : "Unknown error"
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		await connectDB();
		const events = await Event.find().sort({ createdAt: -1 }).lean();

		return NextResponse.json(
			{ message: "Events fetched successfully", events },
			{ status: 200 }
		);
	} catch (error) {
		console.error("GET /api/events error:", error);
		return NextResponse.json(
			{
				message: "Event fetching failed",
				error: error instanceof Error ? error.message : "Unknown error"
			},
			{ status: 500 }
		);
	}
}
