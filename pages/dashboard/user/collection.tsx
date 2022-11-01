import useSWR from "swr"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import QuoteContainer from "@/components/Containers/QuoteContainer"
import BlueButton from "@/components/BlueButton"
import ShowToast from "@/components/ShowToast"
import Skeleton from "@/components/Skeleton"
import Loading from "@/components/Loading"


const CollectionsPage = () => {

	const { ref, inView } = useInView()

	const [Callback, setCallback] = useState({ status: null, text: null })
	let { isValidating: isCheckingSubscription, data: isSubscribed } = useSWR(`/api/user?action=checkUserSubscription`)

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
	}, [inView])

	const { isLoading, data: Pagination, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
		'quotes',
		async ({ pageParam = 0 }) => {
				await new Promise((res) => setTimeout(res, 1000))
				const res = await fetch(`/api/quote/auth?number=${8}&action=getPublicQuotes&page=${pageParam}`)
				const data = await res?.json()
		        return data
		},
		{
			getNextPageParam: (lastPage) => isSubscribed && lastPage?.count ? lastPage?.page : false
		}
    )

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full max-w-6xl">
			<div className="w-full mb-8">
				<div className="heading w-full bg-slate-900 text-white p-5 md:p-10 rounded-xl">
					<div className="mb-2 py-1 px-3 text-sm border border-slate-600 rounded-full inline-block">Free Collection</div>
					<div className="text-2xl md:text-3xl font-semibold w-full">GPT-3 Quotes Collection</div>
					{isCheckingSubscription ? <div className="w-full mt-4"><Loading text="" scpace='0' borderWidth={2} width={25} height={25} /></div> :
					<>
						<div className="text-base md:text-lg mt-4 w-full text-slate-500">
							{!isSubscribed ? <>Get <span className="font-semibold text-white">Premium Collection for $8</span> to</> 
								: <>As a subscriber, you can now</>} access loads of Quotes created by our users. 
								New Quotes & Tweets getting added by the second. Free collection just has a few hundred in it.
						</div>
						{!isSubscribed && 
						<div className="mt-5 w-full flex justify-start">
							<BlueButton text="Get Premium Collection" smallSize={false} fullWidth={false} url="/pricing" />
						</div>}
					</>}
				</div>
			</div>
			<div className="w-full">
				<div className="w-full mb-8 text-base md:text-xl">
					🤖 Have a look at these interesting Quotes
				</div>
				<div className="mt-8 w-full">
					{isLoading ? 
						<div className="w-full columns-1 lg:columns-2 gap-6 py-2"><Skeleton /></div> 
					:
					Pagination && Pagination?.pages && Pagination?.pages?.length > 0 ? <>
						<div className="w-full columns-1 lg:columns-2 gap-6 py-2">
							{Pagination?.pages?.map((page, i) => {
								return page?.quotes?.map((quote, i) => {
									return <QuoteContainer key={i} id={i} quote={quote} callback={(e) => setCallback(e)} />
								})
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
						An error was occurred, please contact us by email at <Link href="mailto:support@insperr.com">support@insperr.com</Link> 
					</div>}
				</div>
			</div>
		</section>
	</>;
}

CollectionsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default CollectionsPage