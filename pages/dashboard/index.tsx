import useSWR from "swr"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { useInView } from "react-intersection-observer"
import { useUser } from "@supabase/auth-helpers-react"
import { Settings } from "@/utils/settings"
import TweetContainer from "@/components/Containers/TweetContainer"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import TweetsSidebarContainer from "@/components/Containers/TweetsSidebarContainer"
import GenerateTweet from "@/components/Containers/GenerateTweet"
import { TweetSkeleton } from "@/components/Skeleton"
import Loading from "@/components/Loading"

const ShowToast = dynamic(() => import("@/components/ShowToast"))


const DashboardHome = () => {

	const user = useUser()
	const { ref, inView } = useInView()

	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)
	
	const { isLoading: isCheckingTwitterData, data: Pagination, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
		'tweets',
		async ({ pageParam = 0 }) => {
				await new Promise((res) => setTimeout(res, 1000))
				const res = await fetch(`/api/user?action=getTweets&number=${2}&page=${pageParam}`)
				const data = await res?.json()
		        return data
		},
		{
			getNextPageParam: (lastPage) => lastPage?.count ? lastPage?.page : false
		}
    )

	const [subs, setSubs] = useState(null)
	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })


	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage()
		}
		if (isCheckingSubscription && !subs) {
			let filter
			if (userData?.subscription)
				filter = Settings?.products.find((itm) => { return userData?.subscription?.product_id === itm.id })
			else 
				filter = Settings?.products.find((itm) => { return (itm.id)?.toLowerCase() === 'free' })

			setSubs({
				name: filter?.name,
				quotes: filter?.quotes,
				autoPost: filter?.autoPost,
				priority_support: filter?.priority_support,
				inProgress: {
					api: filter?.api,
					requests: filter?.requests
				}
			})
		}
	}, [subs, inView])


	return <>
		{(callbackToast?.status && callbackToast?.text) && 
			<ShowToast onClick={(e) => setCallbackToast(e)} type={callbackToast?.status} text={callbackToast?.text} />}
		<section className="w-full h-screen relative overflow-hidden bg-white dark:bg-black">
			<div className="w-full h-full max-w-7xl md:flex">
				<div className="w-full h-full overflow-y-scroll">
					<div style={{ borderWidth: '0 0 6px 0' }} className="w-full border-slate-100 dark:border-zinc-800 p-4 md:p-6">
						<GenerateTweet user={user} />
					</div>
					<div className="w-full">
						{isCheckingTwitterData && !Pagination ? <TweetSkeleton /> : 
							<div className="w-full">
								{Pagination && Pagination?.pages && Pagination?.pages[0]?.tweets?.length > 0 ? <>
									<div className="w-full">
										{Pagination?.pages?.map((page, i) => {
											return page?.tweets?.map((tweet, i) => {
												return <TweetContainer key={i} id={i} 
													subscription={subs}
													user={userData} 
													tweet={tweet} 
													changeTweet={(content) => {
														page?.tweets.forEach((item, i) => {
															if (item?.id == tweet?.id) {
																page.tweets[i].content = content
															}
														})
													}}
													callback={(e) => setCallbackToast(e)} />
											})
										})}
									</div>
									<div className="pagination my-4 text-base text-center">
										{isFetchingNextPage ? <Loading text="null" scpace="0 auto" borderWidth={2} width={20} height={20} /> 
										: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
									</div>
								</>
								: <div className="w-full text-base p-4 md:p-6">
									Hey <span className="font-semibold">{user?.user_metadata?.fullname}</span>., you can now start generating your first <span className="font-semibold">Quotes</span>.
								</div>}
							</div>
						}
					</div>
				</div>
				<TweetsSidebarContainer />
			</div>
		</section>
	</>
}

DashboardHome.getLayout = (page) => <AuthenticatedLayout padding={false}>{page}</AuthenticatedLayout>

export default DashboardHome