// import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { capitalizer } from '@/lib/validation'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import Skeleton from '@/components/Skeleton'
import Loading from "@/components/Loading"
import ShowToast from '@/components/ShowToast'


let take = 20

const Author = ({ slug }) => {

	const [Callback, setCallback] = useState({ status: null, text: null })
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
				const res = await fetch(`/api/quote?number=${take}&target=database&author=${slug}&cursor=${pageParam}&action=getQuotesByAuthorName`)
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
		{(Callback?.status && Callback?.text) && <ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10">
				<div className="heading w-full">
					<div className="text-xl text-center fontRobotoBold md:text-4xl lg:text-5xl w-full">
                        {capitalizer(slug, true /* has dash */)}</div>
					<div className="w-full mt-1 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">———</div>
				</div>
				<div className="w-full mt-10">
					{isLoading ? <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6"><Skeleton /></div> :
					<>
						<div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
							{Quotes && Quotes?.pages.map((page) => {
								return page.quotes.map((quote, i) => (
									<QuoteContainer key={i} id={i} quote={quote} withAuthor={false} type="database" callback={(e) => setCallback(e)} />
								))
							})}
						</div>
						<div className="pagination mt-12 text-base text-center">
							{isFetchingNextPage ? <Loading text="Loading..." width={50} height={50} /> 
							: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
						</div>
					</>}
                </div>
			</div>
		</section>
	</>
}


Author.getInitialProps = async ({ 'query': {slug} }) => { return { slug } }

Author.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default Author