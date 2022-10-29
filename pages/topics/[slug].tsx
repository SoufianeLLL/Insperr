// import useSWR from 'swr'
import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { capitalizer } from '@/lib/validation'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import Skeleton from '@/components/Skeleton'
import Loading from "@/components/Loading"
import { useInView } from 'react-intersection-observer'


let take = 20

const Topic = ({ slug }) => {

	const { ref, inView } = useInView()

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView])
	

	const { isLoading, isError, data: Quotes, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
		'quotes',
		async ({ pageParam = '' }) => {
				await new Promise((res) => setTimeout(res, 1000))
				const res = await fetch(`/api/quote?number=${take}&target=database&topic=${slug}&cursor=${pageParam}&action=getQuotesByTopic`)
				const data = await res?.json()
		        return data
				// const { data: res } = useSWR(`/api/quote?number=${take}&target=database&author=${slug}&cursor=${pageParam}`)
				// return res
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextId ?? false,
		}
    )

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10">
				<div className="heading w-full">
					<div className="text-xl text-center fontRobotoBold md:text-4xl lg:text-5xl w-full">
                        #{capitalizer(slug, true /* has dash */)}</div>
					<div className="w-full mt-1 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">———</div>
				</div>
				<div className="w-full mt-10">
					{isLoading ? <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6"><Skeleton /></div> :
					<>
						<div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
							{Quotes && Quotes?.pages.map((page) => {
								return page.quotes.map((quote, i) => (
									<QuoteContainer type="database" id={i} key={i} quote={quote} />
								))
							})}
						</div>
						<div className="pagination mt-12 text-base text-center">
							{isFetchingNextPage ? <Loading text="Loading..." borderWidth={2} width={30} height={30} /> 
							: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
						</div>
					</>}
                </div>
			</div>
		</section>
	</>
}


Topic.getInitialProps = async ({ 'query': {slug} }) => { return { slug } }

Topic.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default Topic