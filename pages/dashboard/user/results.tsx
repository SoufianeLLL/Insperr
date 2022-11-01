import Link from "next/link"
import { useEffect } from "react"
import { Tooltip } from "flowbite-react"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"
import { useSessionContext } from "@supabase/auth-helpers-react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import Loading from "@/components/Loading"


const QuotesGeneratorResults = ({ resultIds }) => {

	const { supabaseClient } = useSessionContext()
	const { ref, inView } = useInView()

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView])


	const { isLoading, data: Pagination, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
		'quotes',
		async ({ pageParam = 0 }) => {
				await new Promise((res) => setTimeout(res, 1000))
				const res = await fetch(`/api/quote/auth?number=${10}&action=getQuotes&page=${pageParam}`)
				const data = await res?.json()
		        return data
		},
		{
			getNextPageParam: (lastPage) => lastPage?.count ? lastPage?.page : false
		}
    )
	
	const changeQuoteStatus = async (status, id) => {
		if (status) {
			const { error } = await supabaseClient
				.from('quotes')
				.update({
					hidden: status === 'hide' ? true : false
				})
				.eq('id', id)
			
			if (!error) {
				document?.querySelector(`._quote_status_${id}`)?.remove()
			}
		}
	}

	return <>
		<section className="w-full 2xl:px-0 max-w-7xl">
			<div className="w-full pb-3 overflow-hidden">
				<div className="heading w-full">
					<div className="text-xl md:text-2xl font-semibold w-full flex items-center gap-3">💎 Results</div>
				</div>
				<div className="w-full mt-5">
					{isLoading ? <div className="w-full text-center my-12">
						<Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
					:
					Pagination && Pagination?.pages && Pagination?.pages?.length > 0 ? <>
						<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-8">
							{Pagination?.pages?.map((page, i) => {
								return page?.quotes?.map((quote, i) => {
									return (
                                        <div key={i} className="bg-white w-full px-3 py-2 md:px-6 md:py-4 rounded-lg shadow hover:shadow-lg transition duration-200">
                                            <div className="w-full pb-2">
                                                <div className="w-full md:flex items-center gap-2 md:gap-4">
                                                    <div className="w-full text-base shrink flex items-center gap-3">
                                                        {resultIds?.includes(quote?.result_id) && <div className="text-sm inline-block text-white bg-green-600 py-0.5 px-3 rounded-full">new</div> }
                                                        <div className="text-base mb-0.5 text-slate-500">Output:</div>
                                                    </div>
                                                    <div className="flex-none flex items-center gap-3">
                                                        <div className={`_quote_status_${quote?.id}`}>
                                                            {quote?.hidden ? 
                                                                <div className="cursor-pointer transition-all hover:text-green-600 flex items-center text-sm gap-2" onClick={() => changeQuoteStatus('show', quote?.id)}>
                                                                    <Tooltip content="Make it puplic" placement="bottom">
																		<svg className="w-7 h-7" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17c-2.727 0-6-2.778-6-5s3.273-5 6-5 6 2.778 6 5-3.273 5-6 5zm-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"></path></svg>
																	</Tooltip>
                                                                </div> 
                                                                : 
                                                                <div className="cursor-pointer transition-all hover:text-red-500 flex items-center text-sm gap-2" onClick={() => changeQuoteStatus('hide', quote?.id)}>
																	<Tooltip content="Turn it private" placement="bottom">
	                                                                    <svg className="w-7 h-7" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17c-2.727 0-6-2.778-6-5s3.273-5 6-5 6 2.778 6 5-3.273 5-6 5zm-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm9-7L4 19"></path></svg>
																	</Tooltip>
                                                                </div>}
                                                        </div>
                                                        <div className="text-primary-500 hover:text-primary-600 transition-all">
															<Tooltip content="See the output result" placement="bottom">
																<Link href={`/dashboard/user/g/result/${quote?.result_id}`}>
																	<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></Link>
															</Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mt-3">
                                                <div className="w-full" 
                                                    dangerouslySetInnerHTML={{ __html: quote?.content?.replace(/\n/g, '<br>') }} />
                                            </div>
                                        </div>
                                    );
								});
							})}
						</div>
						<div className="pagination mt-12 text-base text-center">
							{isFetchingNextPage ? <Loading text="Loading..." borderWidth={2} width={30} height={30} /> 
							: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
						</div>
					</>
					: 
					<div className="w-full text-center border border-slate-200 rounded-lg px-5 md:px-10 py-12 md:py-24">
						<svg width="80" height="80" viewBox="0 0 24 24" className="text-slate-200 mx-auto mb-4 w-32 h-32"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 4a2 2 0 1 1 4 0v6h6v4H4v-4h6V4zM4 14h16v8H4v-8zm12 8v-5.635M8 22v-5.635M12 22v-5.635"></path></svg>
						You don't have any results yet.
					</div>}
				</div>
			</div>
		</section>
	</>;
}


QuotesGeneratorResults.getInitialProps = async ({ 'query': {resultIds} }) => {
	if (resultIds) {
		return { resultIds }
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: "/"
			}
		}
	}
}

QuotesGeneratorResults.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default QuotesGeneratorResults