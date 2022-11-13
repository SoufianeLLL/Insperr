import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { Settings } from '@/utils/settings'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import BlueButton from '@/components/BlueButton'
import Sidebar from '@/components/Auth/Sidebar'
import Loading from '@/components/Loading'


const APIrequests = { status: 200 }


const DashboardAnalytics = () => {

	const user = useUser()
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)
	
	const [subs, setSubs] = useState(null)
	const [userAccountHelper, setUserAccountHelper] = useState(null)

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
		return () => setUserAccountHelper(false)
	}, [subs])


	return <>
		{subs && <Sidebar title={subs?.name} state={userAccountHelper} callback={(e) => setUserAccountHelper(e)}>
			{subs && <pre>{JSON.stringify((subs), null, 3)?.replaceAll(/['"]+/g, '')}</pre>}
		</Sidebar>}
		<section className="w-full overflow-hidden">
			<div className="w-full mb-8 text-base md:text-xl">
				👋  You Analytics for this month, <span className="font-semibold">{user?.user_metadata?.full_name}</span>!
			</div>
			{parseInt(userData?.generatedQuotes?.toLocaleString(), 10) >= subs?.quotes && 
				<div className="flex items-center gap-4 w-full py-2 px-4 md:py-3 md:px-5 bg-red-100 text-red-500 dark:bg-opacity-20 rounded-xl text-base">
					<svg className="hidden md:block w-20 h-20" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17v2m0-9v6m0-13L2 22h20L12 3z"></path></svg>
					Your subscription has reached {subs?.quotes} Quotes in total, which is 100% of your monthly quota, you can always upgrade your account to use more quota.
				</div>}
			<div className="w-full">
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-8 max-w-7xl content-start">
					<div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-xl">
						<div className="w-full overflow-hidden">
							<div className="flex items-start gap-2">
								<div className="w-full shrink">
									<div className="w-full text-lg">Generated Quotes</div>
								</div>
								<div className="flex-none">
									{isCheckingSubscription ? 
										<div className="w-full mt-1"><Loading text="" scpace='0 auto' borderWidth={2} width={25} height={25} /></div>
									:
										userData?.subscription ? <div onClick={() => setUserAccountHelper(true)} className="cursor-pointer transition-all hover:text-white hover:bg-primary-500 text-sm py-1 px-4 text-primary-500 rounded-full border-2 border-primary-500">
											{subs?.name}</div> : <BlueButton text="Upgrade" url="/pricing" />
									}
								</div>
							</div>
							<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
								<div className="flex items-end justify-center w-full gap-2">
									{isCheckingSubscription ? 
										<div className="w-full">—</div>
									:
										<>
											{parseInt(userData?.generatedQuotes?.toLocaleString(), 10)} <div className="text-xl md:text-3xl">/ <span>{subs?.quotes}</span></div>
										</>
									}
								</div>
							</div>
							<div className="w-full text-center mt-1 inline-block text-sm">This month</div>
						</div>
					</div>
					<div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-xl sm:my-0 my-4">
						<div className="w-full overflow-hidden">
							<div className="flex items-start gap-2">
								<div className="w-full shrink">
									<div className="w-full text-lg">Tweeted Quotes</div>
								</div>
								<div className="flex-none">
									{isCheckingSubscription && 
										<div className="w-full mt-1"><Loading text="" scpace='0 auto' borderWidth={2} width={25} height={25} /></div>}
								</div>
							</div>
							<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
								{isCheckingSubscription ? 
									<div className="w-full">—</div>
								:
									<div className="w-full mt-2">
										{userData?.tweetedQuotes?.toLocaleString()}
									</div>
								}
							</div>
							<div className="w-full text-center mt-1 inline-block text-sm">All time</div>
						</div>
					</div>
					<div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-xl sm:my-0 my-4">
						<div className="w-full opacity-60 cursor-wait relative overflow-hidden">
							<div style={{ zIndex: 800 }} className="top-0 right-0 left-0 bottom-0 bg-white dark:bg-zinc-900 opacity-60 absolute"></div>
							<div className="w-full text-lg">API Requests</div>
							{APIrequests && APIrequests?.status === 200 ? <>
								<div className="w-full">
									<div className="w-full mt-5 flex items-center justify-center gap-10">
										<div className="w-full relative text-center">
											<svg className="mx-auto flex items-center justify-center w-32 h-32 transform -rotate-90">
												<circle cx="65" cy="65" r="55" stroke="currentColor" strokeWidth="10" fill="transparent"
													className="text-slate-100" />
												<circle cx="65" cy="65" r="55" stroke="currentColor" strokeWidth="10" fill="transparent"
													strokeDasharray={ 2 * 22 / 7 * 55 }
													// strokeDashoffset={ (2 * 22 / 7 * 55) - parseInt(APIrequests?.readRequests) / 20000 * (2 * 22 / 7 * 55) } // Read
													strokeDashoffset={ (2 * 22 / 7 * 55) - 6.98 / 20000 * (2 * 22 / 7 * 55) } // Read
													className="text-primary-400"
													strokeLinecap="round" />
											</svg>
											<div className="absolute top-14 text-base left-0 right-0 text-center mx-auto">
												{/* {(((parseInt(APIrequests?.readRequests) / 20000) * 100)?.toFixed(1))?.toString()}% */}
												6.98%
											</div>
										</div>
										<div className="w-full relative text-center">
											<svg className="mx-auto flex items-center justify-center w-32 h-32 transform -rotate-90">
												<circle cx="65" cy="65" r="55" stroke="currentColor" strokeWidth="10" fill="transparent"
													className="text-slate-100" />
												<circle cx="65" cy="65" r="55" stroke="currentColor" strokeWidth="10" fill="transparent"
													strokeDasharray={ 2 * 22 / 7 * 55 }
													// strokeDashoffset={ (2 * 22 / 7 * 55) - parseInt(APIrequests?.createRequests) / 1000 * (2 * 22 / 7 * 55) } // Create
													strokeDashoffset={ (2 * 22 / 7 * 55) - 39.4 / 1000 * (2 * 22 / 7 * 55) } // Create
													className="text-green-500"
													strokeLinecap="round" />
											</svg>
											<div className="absolute top-14 text-base left-0 right-0 text-center mx-auto">
												{/* {(((parseInt(APIrequests?.createRequests) / 1000) * 100)?.toFixed(1))?.toString()}% */}
												39.4%
											</div>
										</div>
									</div>
									<div className="text-center w-full mb-5 relative">
										<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-6xl fontBold">
											{/* {(APIrequests?.createRequests + APIrequests?.readRequests)?.toLocaleString()} */}
											{(758 + 394)?.toLocaleString()}
										</div>
										<div className="w-full text-center mt-1 inline-block text-base">
											Requests <span className="text-sm text-primary-500">/total</span>
										</div>
									</div>
								</div>
								<div className="w-full mt-2 grid grid-cols-2 gap-2 items-center">
									<div className="w-full">
										<div className="w-full flex items-center gap-2">
											<span className="w-3 h-3 inline-block border-2 border-primary-400 rounded-full"></span>
											<div className="text-base">
												{/* Read: <span className="font-semibold">{(APIrequests?.readRequests)?.toLocaleString()}</span> */}
												Read: <span className="font-semibold">758</span>
											</div>
										</div>
										<div className="w-full mt-1 text-xs">20000 /month</div>
									</div>
									<div className="w-full">
										<div className="w-full flex items-center justify-end gap-2">
											<span className="w-3 h-3 inline-block border-2 border-green-500 rounded-full"></span>
											<div className="text-base">
												{/* Create: <span className="font-semibold">{(APIrequests?.createRequests)?.toLocaleString()}</span> */}
												Create: <span className="font-semibold">394</span>
											</div>
										</div>
										<div className="w-full mt-1 text-right text-xs">1000 /month</div>
									</div>
								</div>
							</>
							: <div className="w-full my-24"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div>}
						</div>
					</div>
					<div className="w-full bg-white dark:bg-zinc-900 p-5 rounded-xl">
						<div className="w-full overflow-hidden">
							<div className="w-full text-lg">Keyboard Shortcuts</div>
							<div className="w-full mt-5">
								<div className="grid grid-cols-1 md:grid-cols-1 w-full gap-2 text-sm">
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+B</span> Previous page
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+H</span> Home
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+D</span> Dashboard
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+C</span> Quotes Collection
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+U</span> User Account
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+G</span> Generate new Quotes
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+P</span> Our Pricing
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+M</span> Profile
									</div>
									{/* <div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+H</span> Documentions (help)
									</div>
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+A</span> API Admin
									</div> */}
									<div className="w-full">
										<span className="inline-block bg-slate-100 dark:bg-zinc-800 py-1 px-2 rounded-full mr-2">⇧+S</span> Support
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</>;
}


DashboardAnalytics.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default DashboardAnalytics