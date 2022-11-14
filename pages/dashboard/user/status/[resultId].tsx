import { useEffect, useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Settings } from "@/utils/settings"
import TweetContainer from "@/components/Containers/TweetContainer"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import TweetsSidebarContainer from "@/components/Containers/TweetsSidebarContainer"
import { TweetSkeleton } from "@/components/Skeleton"


const ShowToast = dynamic(() => import("@/components/ShowToast"))


const Status = ({ resultId }) => {

	const { data: quote, error } = useSWR(`/api/ai/result/${resultId}`)
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)
	
	const [subs, setSubs] = useState(null)
	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })
	const isCheckingData = !quote && !error


	useEffect(() => {
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
	}, [subs])

	return <>
		{(callbackToast?.status && callbackToast?.text) && 
			<ShowToast onClick={(e) => setCallbackToast(e)} type={callbackToast?.status} text={callbackToast?.text} />}
		<section className="w-full h-screen relative overflow-hidden bg-white dark:bg-black">
			<div className="w-full h-full max-w-7xl md:flex">
				<div className="w-full h-full overflow-y-scroll">
					<div className="w-full border-b border-slate-200 dark:border-zinc-800 p-4 md:p-6">
						<div className="w-full flex items-center">
							<Link className="inline-block h-full" href="/dashboard">
								<svg className="w-8 h-8 text-black dark:text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M18 12.4H6M11.4 7 6 12.4l5.4 5.4"></path></svg>
							</Link>
						</div>
						{parseInt(userData?.generatedQuotes?.toLocaleString(), 10) >= subs?.quotes && 
							<div className="mt-4 flex items-center gap-4 w-full py-2 px-4 md:py-3 md:px-5 bg-red-100 text-red-500 dark:bg-opacity-20 rounded-xl text-base">
								<svg className="hidden md:block w-20 h-20" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17v2m0-9v6m0-13L2 22h20L12 3z"></path></svg>
								Your subscription has reached {subs?.quotes} Quotes in total, which is 100% of your monthly quota, you can always upgrade your account to use more quota.
							</div>}
					</div>
					<div className="w-full">
						{isCheckingData ? <TweetSkeleton count={1} /> : 
							<div className="w-full">
								<div className="w-full">
									<TweetContainer id={quote?.result?.id} 
										subscription={subs}
										user={userData} 
										contentWithLink={false}
										tweet={quote?.result} 
										changeTweet={(content) => {
											quote.result.content = content
										}}
										callback={(e) => setCallbackToast(e)} />
								</div>
							</div>}
					</div>
				</div>
				<TweetsSidebarContainer />
			</div>
		</section>
	</>
}


export const getServerSideProps = async ({ res, 'query': {resultId} }) => { 
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	)
	return { 
		props: {
			resultId
		}
	}
}

Status.getLayout = (page) => <AuthenticatedLayout padding={false}>{page}</AuthenticatedLayout>

export default Status