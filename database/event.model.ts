import {Document, Schema, model, models} from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
	title: string;
	slug: string;
	description: string;
	overview: string;
	image: string;
	venue: string;
	location: string;
	date: string;
	time: string;
	mode: string;
	audience: string;
	agenda: string[];
	organizer: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
			maxlength: [100, 'Title cannot exceed 100 characters'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			trim: true,
			maxlength: [1000, 'Description cannot exceed 1000 characters'],
		},
		overview: {
			type: String,
			required: [true, 'Overview is required'],
			trim: true,
			maxlength: [500, 'Overview cannot exceed 500 characters'],
		},
		image: {
			type: String,
			required: [true, 'Image URL is required'],
			trim: true,
		},
		venue: {
			type: String,
			required: [true, 'Venue is required'],
			trim: true,
		},
		location: {
			type: String,
			required: [true, 'Location is required'],
			trim: true,
		},
		date: {
			type: String,
			required: [true, 'Date is required'],
		},
		time: {
			type: String,
			required: [true, 'Time is required'],
		},
		mode: {
			type: String,
			required: [true, 'Mode is required'],
			enum: {
				values: ['online', 'offline', 'hybrid'],
				message: 'Mode must be either online, offline, or hybrid',
			},
		},
		audience: {
			type: String,
			required: [true, 'Audience is required'],
			trim: true,
		},
		agenda: {
			type: [String],
			required: [true, 'Agenda is required'],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: 'At least one agenda item is required',
			},
		},
		organizer: {
			type: String,
			required: [true, 'Organizer is required'],
			trim: true,
		},
		tags: {
			type: [String],
			required: [true, 'Tags are required'],
			validate: {
				validator: (v: string[]) => v.length > 0,
				message: 'At least one tag is required',
			},
		},
	},
	{
		timestamps: true, // Auto-generate createdAt and updatedAt
	},
);

// Pre-save hook for slug generation and date/time normalization
EventSchema.pre('save', async function (next) {
	const event = this as IEvent;

	// Generate slug only if title is modified or document is new
	if (event.isModified('title')) {
		event.slug = event.title
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '') // Remove special characters
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
			.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
	}

	// Normalize date to ISO format (YYYY-MM-DD)
	if (event.isModified('date')) {
		const parsedDate = new Date(event.date);
		if (isNaN(parsedDate.getTime())) {
			return next(new Error('Invalid date format'));
		}
		event.date = parsedDate.toISOString().split('T')[0];
	}

	// Normalize time to 24-hour format (HH:MM)
	if (event.isModified('time')) {
		const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
		if (!timeRegex.test(event.time)) {
			return next(new Error('Time must be in HH:MM format (24-hour)'));
		}
	}

	next();
});

// Prevent model recompilation in development (Next.js hot reload)
const Event = models.Event || model<IEvent>('Event', EventSchema);

export default Event;
