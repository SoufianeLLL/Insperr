
const Skeleton = ({ count=6 }) => {
	return <>
		{[...Array(count)].map((n, i) =>
			<div key={i} className="h-60 rounded-2xl mb-6 p-5 md:p-8 bg-slate-200 dark:bg-zinc-900 bg-opacity-40">
				<div className="w-full flex items-center gap-x-4">
					<div style={{ width: '50px', height: '50px' }} className="rounded-full flex-none skeleton"></div>
					<div className="w-full">
						<div className="w-40 h-6 rounded-full skeleton"></div>
						<div className="w-32 mt-2 h-4 rounded-full skeleton"></div>
					</div>
				</div>
				<div className="w-full mt-4">
					<div className="skeleton w-full rounded-full h-5"></div>
					<div className="skeleton w-full mt-2 rounded-full h-5"></div>
					<div className="skeleton w-10/12 mt-2 rounded-full h-5"></div>
				</div>
				<div className="w-full mt-4">
					<div className="skeleton w-40 rounded-full h-5"></div>
				</div>
			</div>
		)}
	</>
}



const TweetSkeleton = ({ count=4 }) => {
	return <>
		<div className="w-full">
			{[...Array(count)].map((n, i) =>
				<div key={i} className={`w-full p-4 md:p-6 ${n+1 === i ? 'border-b border-slate-200 dark:border-zinc-700' : ''}`}>
					<div className="w-full flex gap-x-4 items-start">
						<div className="flex-none skeleton w-12 h-12 bg-slate-200 dark:bg-zinc-900 rounded-full"></div>
						<div className="w-full text-base shrink">
							<div className="w-full flex items-center gap-3">
								<div className="w-32 h-4 rounded-full skeleton"></div>
								<div className="w-24 h-4 rounded-full skeleton"></div>
							</div>
							<div className="w-full mt-2">
								<div className="skeleton w-full rounded-full h-5"></div>
								<div className="skeleton w-full mt-2 rounded-full h-5"></div>
								<div className="skeleton w-10/12 mt-2 rounded-full h-5"></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	</>
}



export {
	Skeleton,
	TweetSkeleton
}