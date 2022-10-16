import useSWR from 'swr'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Loading from '@/components/Loading'
import BlueButton from '@/components/BlueButton'



const DashboardPage = () => {

	const { user } = useUser()	
	let { data: userData } = useSWR(`/api/user?id=${user?.id}`)
	let { data: APIrequests } = useSWR(`/api/requests?user_id=${user?.id}`)

	return (
		<section className="w-full overflow-hidden">
			<div className="w-full mb-8 text-base md:text-xl">
				👋  Let's get you tweeting, {user?.user_metadata?.fullname}!
			</div>
			<div className="w-full">
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 sm:gap-8 max-w-7xl content-start">
					<div className="w-full bg-white p-5 rounded-xl">
						<div className="w-full overflow-hidden">
							<div className="flex items-start gap-2">
								<div className="w-full shrink">
									<div className="w-full text-lg">Generated Quotes</div>
								</div>
								<div className="flex-none">
									<BlueButton text="Upgrade" url="/pricing" />
								</div>
							</div>
							<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
								{userData && userData?.status !== 200 ? 
									<div className="mt-3 w-full"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
								: userData?.generatedQuotes?.toLocaleString()}
							</div>
							<div className="w-full text-center mt-1 inline-block text-sm">
								This month — <span className="text-primary-500">Unlimited Quotes</span></div>
						</div>
					</div>
					<div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
						<div className="w-full overflow-hidden">
							<div className="w-full text-lg">Quotes Visits</div>
							<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
								{userData && userData?.status !== 200 ? 
									<div className="mt-3 w-full"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
								: userData?.quotesVisits?.toLocaleString()}
							</div>
							<div className="w-full text-center mt-1 inline-block text-sm">
								This month — <span className="text-primary-500">This Year: {userData?.quotesVisitsYearly?.toLocaleString()}</span></div>
						</div>
					</div>
					<div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
						<div className="w-full overflow-hidden">
							<div className="flex items-start gap-2">
								<div className="w-full shrink">
									<div className="w-full text-lg">Tweets</div>
								</div>
								<div className="flex-none">
									<BlueButton text="Connect" url="/dashboard/user/account?op=connect&redirect=dashboard/user/connect" />
								</div>
							</div>
							<div className="w-full text-center mt-5 inline-block text-base md:text-xl">
								<div className="w-full my-14">
									<svg fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4 w-14 h-14 text-slate-200"><path fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
									Connect your Twitter account, and start tweeting at a scheduled time.
								</div>
							</div>
						</div>
					</div>
					<div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
						<div className="w-full overflow-hidden">
							<div className="w-full text-lg">API Requests</div>
							{APIrequests && APIrequests?.status === 200 ? <>
								<div className="w-full h-80 items-center justify-center flex">
									<div className="flex items-center justify-center relative">
										<svg className="transform -rotate-90 w-72 h-72">
											<circle cx="145" cy="145" r="120" stroke="currentColor" strokeWidth="10" fill="transparent"
												className="text-slate-100" />
											<circle cx="145" cy="145" r="120" stroke="currentColor" strokeWidth="10" fill="transparent"
												strokeDasharray={ 2 * 22 / 7 * 120 }
												strokeDashoffset={ (2 * 22 / 7 * 120) - 80 / 100 * (2 * 22 / 7 * 120) } // 80%
												className="text-primary-400"
												strokeLinecap="round" />
											<circle cx="145" cy="145" r="120" stroke="currentColor" strokeWidth="10" fill="transparent"
												strokeDasharray={ 2 * 22 / 7 * 120 }
												strokeDashoffset={ (2 * 22 / 7 * 120) - 40 / 100 * (2 * 22 / 7 * 120) } // 40%
												className="text-primary-800 rounded-full"
												strokeLinecap="round" />
										</svg>
										<div className="w-full absolute left-0 right-0">
											<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-6xl fontBold">
												{(APIrequests?.newRequests + APIrequests?.returningRequests)?.toLocaleString()}</div>
											<div className="w-full text-center mt-1 inline-block text-sm text-primary-500">
												{process?.env?.ALLOWED_API_REQUESTS_PER_MONTH ?? 20000} /per month</div>
											<div className="w-full text-center mt-1 inline-block text-base">Requests</div>
										</div>
									</div>
								</div>
								<div className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
									<div className="w-full flex items-center gap-2">
										<span className="w-3 h-3 inline-block border-2 border-primary-400 rounded-full"></span>
										<div className="text-base">Custom: {(APIrequests?.newRequests)?.toLocaleString()}</div>
									</div>
									<div className="w-full flex items-center justify-end gap-2">
										<span className="w-3 h-3 inline-block border-2 border-primary-800 rounded-full"></span>
										<div className="text-base">Returning: {(APIrequests?.returningRequests)?.toLocaleString()}</div>
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
	)
}


DashboardPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export const getServerSideProps = withPageAuth({ redirectTo: '/access?op=signin' })

export default DashboardPage