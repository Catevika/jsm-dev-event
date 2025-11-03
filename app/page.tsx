import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import {cacheLife} from 'next/cache';

import {events} from '@/lib/constants';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
	'use cache';
	cacheLife('hours');

	// const response = await fetch(`${BASE_URL}/api/events`);
	// const data = await response.json();

	// if (!response.ok || !data || typeof data !== 'object') {
	// 	throw new Error('Invalid or incomplete JSON data');
	// }

	// const {events} = data;

	return (
		<section>
			<h1 className='text-center'>
				The Hub for Every Dev <br />
				Event you Can't Miss
			</h1>
			<p className='text-center mt-5'>
				Hackatons, Meetups and Conferences, all in one place
			</p>

			<ExploreBtn />

			<div className='mt-20 space-y-7'>
				<h3 id='events'>Featured Events</h3>
				<ul className='events'>
					{events &&
						events.length > 0 &&
						events.map((event: any) => (
							<li key={event.title}>
								<EventCard {...event} />
							</li>
						))}
				</ul>
			</div>
		</section>
	);
};

export default Home;
