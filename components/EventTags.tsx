const EventTags = ({tags}: {tags: string[]}) => {
	return (
		<div className='flex flex-row gap-1.5 flex-wrap'>
			{tags.map((tag, index) => (
				<div
					key={index}
					className='pill'>
					<p className='flex-center rounded-full border border-border-dark px-2 py-1 text-sm font-semibold'>
						{tag}
					</p>
				</div>
			))}
		</div>
	);
};

export default EventTags;
