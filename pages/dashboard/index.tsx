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
								{Pagination && Pagination?.pages && Pagination?.pages?.length > 0 ? <>
									<div className="w-full">
										{Pagination?.pages?.map((page, i) => {
											if (page?.tweets && page?.tweets?.length > 0) {
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
											}
											else {
												return <div className="w-full text-base text-center max-w-md mx-auto p-4 md:p-6">
													<svg fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14 text-slate-200 dark:text-zinc-700"><path fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
													Hey there, try to generate your first quotes on <span className="font-semibold">Insperr</span>.
												</div>
											}
										})}
									</div>
									<div className="pagination my-4 text-base text-center">
										{isFetchingNextPage ? <Loading text="null" scpace="0 auto" borderWidth={2} width={20} height={20} /> 
										: <div style={{ visibility: 'hidden' }} ref={ref}>intersection observer marker</div>}
									</div>
								</>
								: <div className="w-full text-base text-center max-w-md mx-auto p-4 md:p-6">
									<svg fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14 text-slate-200 dark:text-zinc-700"><path fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
									Hey there, try to generate your first quotes on <span className="font-semibold">Insperr</span>.
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