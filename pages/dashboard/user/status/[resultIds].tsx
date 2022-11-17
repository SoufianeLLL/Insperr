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


const Status = ({ resultIds }) => {

	const { data: quotes, error } = useSWR(`/api/ai/result/${resultIds}`)
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)
	
	const [subs, setSubs] = useState(null)
	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })
	const isCheckingData = !quotes?.result && !error


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
							quotes?.result?.length > 0 ? 
								<div className="w-full">
									{quotes?.result?.map((quote, i) => {
										return <div className={`w-full ${(quotes?.result?.length > 1 && i+1 !== quotes?.result?.length) 
											? 'border-b border-slate-200 dark:border-zinc-800' : ''}`}>
											<TweetContainer key={i} id={quote?.id} 
												subscription={subs}
												user={userData} 
												contentWithLink={false}
												tweet={quote} 
												changeTweet={(content) => {
													quotes.result[i].content = content
												}}
												callback={(e) => setCallbackToast(e)} />
										</div>
									})}
								</div>
							:
								<div className="w-full text-center px-5 md:px-10 py-12 md:py-24">
									<svg width="80" height="80" viewBox="0 0 24 24" className="dark:text-zinc-800 text-slate-200 mx-auto mb-4 w-32 h-32"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 4a2 2 0 1 1 4 0v6h6v4H4v-4h6V4zM4 14h16v8H4v-8zm12 8v-5.635M8 22v-5.635M12 22v-5.635"></path></svg>
									The quote you're looking for is not found or deleted!
								</div>
							}
					</div>
				</div>
				<TweetsSidebarContainer />
			</div>
		</section>
	</>
}


export const getServerSideProps = async ({ res, query: {resultIds} }) => { 
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59'
	)
	return { 
		props: {
			resultIds
		}
	}
}

Status.getLayout = (page) => <AuthenticatedLayout padding={false}>{page}</AuthenticatedLayout>

export default Status