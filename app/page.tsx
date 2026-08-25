import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { getEvents } from "@/lib/actions/event.actions";
import { connection } from "next/server";
import { Suspense } from "react";

const EventList = async () => {
	await connection();
	const events = await getEvents();

	return (
		<ul className='events'>
			{events.length > 0 &&
				events.map((event) => (
					<li key={event.title}>
						<EventCard {...event} />
					</li>
				))}
		</ul>
	);
};

const Home = async () => {
	return (
		<section>
			<h1 className='text-center'>
				The Hub for Every Dev <br />
				Event you Can&apos;t Miss
			</h1>
			<p className='text-center mt-5'>
				Hackatons, Meetups and Conferences, all in one place
			</p>

			<ExploreBtn />

			<div className='mt-20 space-y-7'>
				<h3 id='events'>Featured Events</h3>
				<Suspense fallback={<ul className='events' />}>
					<EventList />
				</Suspense>
			</div>
		</section>
	);
};

export default Home;
