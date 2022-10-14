import useSWR, { useSWRConfig } from 'swr'
import Link from 'next/link'
import { capitalizer, sluging } from '@/lib/validation'
import Loading from "@/components/Loading"


const TopicList = () => {

	// get topics list
	// const { data: Topics } = useSWR(`/api/topic`)
	const { cache } = useSWRConfig()
	let TopicsURI = `/api/topic`, Topics = cache.get(TopicsURI) && useSWR(TopicsURI)?.data

	return <>
		<div className="w-full mt-12 topics-list">
			{Topics ? 
			<>
				<div className="w-full">
					<div className="mt-8 w-full">
						<div className="w-full border-t border-slate-200 my-5 list-of-topics">
							<div className="letter text-4xl md:text-5xl my-5 fontBold hidden"></div>
							<div className="mt-5 w-full text-slate-500 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-y-2 gap-x-6">
								{Topics?.map((topic, i) => {
									return <Link key={topic?.id} href={`topics/${sluging(topic?.name)}`}><a><div className="w-full mb-2 cursor-pointer hover:text-black text-base">
										{capitalizer(topic?.name)}</div></a></Link>
								})}
							</div>
						</div>
					</div>
				</div>
			</>
			: 
			<div className="w-full text-center my-20 text-base">
				<Loading text="Loading..." width={50} height={50} />
			</div>}
		</div>
	</>
}

export default TopicList