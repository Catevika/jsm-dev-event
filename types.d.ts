type eventCardProps = {
	title: string;
	image: string;
	slug: string;
	location: string;
	date: string;
	time: string;
};

// Type for lean Event documents (plain objects without Mongoose methods)
type LeanEvent = {
  _id: string;
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
};
