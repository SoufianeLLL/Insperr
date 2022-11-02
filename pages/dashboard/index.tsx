import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Tooltip } from "flowbite-react"
import { useEffect, useState } from 'react'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { Settings } from '@/utils/settings'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import BlueButton from '@/components/BlueButton'
import Sidebar from '@/components/Auth/Sidebar'
import Loading from '@/components/Loading'


const APIrequests = { status: 200 }


const DashboardPage = () => {

	const user = useUser()
	const router = useRouter()
	const { isLoading } = useSessionContext()
	let { isValidating: isCheckingSubscription, data: userData } = useSWR(`/api/user?action=getUserData`)
	// let { data: APIrequests } = useSWR(`/api/requests`)
	
	const [subs, setSubs] = useState(null)
	const [connect, setConnect] = useState(false)
	const [userAccountHelper, setUserAccountHelper] = useState(null)
	let { isValidating: isCheckingTwitterData, data: twitterData } = useSWR(`/api/user?action=getTwitterData`)

	const connectTwitterAccount = async () => {
		setConnect(true)
		try {
			const result = await fetch(`${process.env.NEXT_PUBLIC_URL_HOME}/api/auth/twitter/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					redirect: `${process.env.NEXT_PUBLIC_URL_HOME}/dashboard`
				})
			})
			const res = await result?.json()
			if (res) {
				router?.push(res?.url)
			}
		}
		catch (e) {
			setConnect(false)
			console.error(e)
		}
	}

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
                👋  Let's get you tweeting, <span className="font-semibold">{user?.user_metadata?.full_name}</span>!
            </div>
            {userData?.generatedQuotes?.toLocaleString() >= subs?.quotes && 
                <div className="flex items-center gap-4 w-full mb-8 py-2 px-4 md:py-3 md:px-5 bg-red-100 text-red-500 rounded-xl text-base">
                    <svg className="w-10 h-10" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 17v2m0-9v6m0-13L2 22h20L12 3z"></path></svg>
                    Your subscription has reached {subs?.quotes} Quotes in total, which is 100% of your monthly quota, you can always upgrade your account to use more quota.
                </div>}
            <div className="w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-8 max-w-7xl content-start">
                    <div className="w-full bg-white p-5 rounded-xl">
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
                                            {userData?.generatedQuotes?.toLocaleString()} <div className="text-xl md:text-3xl">/ <span>{subs?.quotes}</span></div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="w-full text-center mt-1 inline-block text-sm">This month</div>
                        </div>
                    </div>
                    <div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
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
                    <div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
                        <div className="w-full overflow-hidden">
                            <div className="flex items-start gap-2">
                                <div className="w-full shrink">
                                    <div className="w-full text-lg">Latest Tweets</div>
                                </div>
                                <div className="flex-none">
                                    {isLoading || isCheckingTwitterData || connect ? 
                                    <div className="w-full mt-1"><Loading text="" scpace='0 auto' borderWidth={2} width={25} height={25} /></div>
                                    :
									!twitterData?.isTwitterLinked ?
										<div onClick={() => connectTwitterAccount()}><BlueButton text="Connect" isLink={false} /></div>
									:
										<div className="flex items-center gap-1 text-primary-500">
											<svg className="w-6 h-6" height="25" width="25" fill="currentColor" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fillRule="nonzero"/></svg>
											<Tooltip content="Twitter account" placement="bottom">
												<span className="text-base">Connected</span>
											</Tooltip>
	                                    </div>}
                                </div>
                            </div>
                            <div className="w-full text-center mt-8 inline-block text-base">
								{isCheckingTwitterData ? '' :
								!twitterData?.isTwitterLinked ? 
									<div className="w-full my-14 px-0 md:px-5">
										<svg fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14 text-slate-200"><path fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
										Connect your Twitter account, and start tweeting at a scheduled time.
									</div>
								:
									<div className="w-full">
										{twitterData?.lastTweets ? 
										<div className="w-full h-72 overflow-x-hidden overflow-y-scroll">
											{twitterData?.lastTweets?.map((tweet, i) => {
												return <div key={i} className={`${i+1 !== twitterData?.lastTweets?.length && 'border-b border-slate-100'} leading-tight py-3 px-3 text-base text-left w-full`}>
													<div className="w-full flex items-center gap-3 mb-2">
														<Tooltip content="See the output result" placement="bottom">
															<Link href={`/dashboard/user/g/result/${tweet?.result_id}`}>
																<svg className="text-primary-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></Link>
														</Tooltip>
														<div className="shrink text-sm w-full">{tweet?.place === 'startwith' ? 'Start with:' : 'Contains:'} <span className="font-semibold w-full">{tweet?.keyword}</span></div>
													</div>
													{tweet?.content}</div>
											})}
										</div>
										:
										<div className="w-full my-14 px-0 md:px-10">
											<svg fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14 text-slate-200"><path fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
											You don't have any tweets from <span className="font-semibold">Insperr</span>, try to generate some and turn on <span className="font-semibold">Auto-Post</span> to see your realtime custom tweets.
										</div>}
									</div>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
                        <div className="w-full opacity-60 cursor-wait relative overflow-hidden">
                            <div style={{ zIndex: 800 }} className="top-0 right-0 left-0 bottom-0 bg-white opacity-60 absolute"></div>
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
                    <div className="lg:col-span-2 w-full bg-white p-5 rounded-xl">
                        <div className="w-full overflow-hidden">
                            <div className="w-full text-lg">Keyboard Shortcuts</div>
                            <div className="w-full mt-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 text-sm">
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+B</span> Go Back to previous page
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+D</span> Dashboard
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+G</span> Generate new Quotes
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+C</span> Manage your Collections
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+U</span> User Account
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+P</span> Our Pricing
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+H</span> Documentions (help)
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+A</span> API Admin
                                    </div>
                                    <div className="w-full">
                                        <span className="inline-block bg-slate-100 py-1 px-2 rounded-full mr-2">⇧+S</span> Support
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


DashboardPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export const getServerSideProps = withPageAuth({ redirectTo: '/access?op=signin' })

export default DashboardPage