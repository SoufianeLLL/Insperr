import useSWR from 'swr'
import { useState } from 'react'
import { capitalizer } from '@/lib/validation'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import Skeleton from '@/components/Skeleton'
import Loading from "@/components/Loading"


let take = 20, skip = 0

const Author = ({ slug }) => {

	const [isFetching, setFetching] = useState(false)
	const [prev, setPreviousQuotes] = useState(null)
	let { data: Quotes } = useSWR(`/api/quote?number=${take}&random=${false}&target=database&author=${slug}&skip=${skip}`)

	const LoadMore = () => {
		// setFetching(true)
		// if (prev) {
		// 	if (skip === (Quotes?.length - take)) {
		// 		skip = (skip + take)
		// 		setPreviousQuotes(prev => [...prev, ...Quotes])
		// 		setFetching(false)
		// 	}
		// }
	}

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10">
				<div className="heading w-full">
					<div className="text-xl text-center fontRobotoBold md:text-4xl lg:text-5xl w-full">
                        {capitalizer(slug, true /* has dash */)}</div>
					<div className="w-full mt-1 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">———</div>
				</div>
				<div className="w-full mt-10">
                    <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
						{
						prev && prev?.length > 0 ? prev?.map((quote, i) => {
							return <QuoteContainer key={i} quote={quote} />
						})
						: Quotes && Quotes?.length > 0 ? Quotes?.map((quote, i) => {
							return <QuoteContainer key={i} quote={quote} />
						})
						: <Skeleton />}
					</div>
					<div className="pagination mt-12 text-base text-center">
						{isFetching ? <Loading text="Loading..." width={50} height={50} /> 
						: <div className="cursor-pointer inline-block mx-auto transition duration-200 hover:bg-zinc-200 rounded-lg py-2 px-4" onClick={() => LoadMore()}>Load more quotes</div>}
					</div>
                </div>
			</div>
		</section>
	</>
}


Author.getInitialProps = async ({ 'query': {slug} }) => { return { slug } }

Author.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default Author