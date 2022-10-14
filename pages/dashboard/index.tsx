import useSWR from 'swr'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import AuthenticatedLayout from '@/components/AuthenticatedLayout'
import Loading from '@/components/Loading'



const DashboardPage = () => {

	const { isLoading, user } = useUser()	
	let { data: userData } = useSWR(`/api/user?id=${user?.id}`)

	return (
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10 overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					<div className="w-full sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-3 content-start">
						<div className="w-full bg-white p-5 rounded-xl">
							<div className="w-full overflow-hidden">
								<div className="w-full text-lg">Generated Quotes</div>
								<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
									{isLoading && userData?.status == 200 ? 
										<div className="mt-3 w-full"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
									: userData?.generatedQuotes?.toLocaleString()}
								</div>
								<div className="w-full text-center mt-1 inline-block text-sm">
									This month — <span className="text-primary-500">Unlimited Quotes</span></div>
								<Link href="/dashboard/user/g"><a className="bg-primary-500 text-base inline-block text-white w-full rounded-lg mt-5 py-2 px-2 text-center hover:bg-primary-700 transition duration-200">
									Generate Quotes</a></Link>
							</div>
						</div>
						<div className="w-full bg-white p-5 rounded-xl sm:my-0 my-4">
							<div className="w-full overflow-hidden">
								<div className="w-full text-lg">Quotes Visits</div>
								<div className="w-full text-center mt-5 inline-block text-3xl md:text-5xl lg:text-7xl fontBold">
									{isLoading && userData?.status == 200 ? 
										<div className="mt-3 w-full"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
									: userData?.quotesVisits?.toLocaleString()}
								</div>
								<div className="w-full text-center mt-1 inline-block text-sm">
									This month — <span className="text-primary-500">This Year: {userData?.quotesVisitsYearly?.toLocaleString()}</span></div>
								<Link href="/dashboard/user/collections"><a className="bg-slate-100 text-black text-base inline-block w-full rounded-lg mt-5 py-2 px-2 text-center hover:bg-slate-200 transition duration-200">
									Manage Collections</a></Link>
							</div>
						</div>
						<div className="col-span-2 w-full bg-white p-5 rounded-xl">
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
					<div className="w-full bg-white p-5 rounded-xl">
						<div className="w-full overflow-hidden">
							<div className="w-full text-lg">API Requests</div>
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
											9,245</div>
										<div className="w-full text-center mt-1 inline-block text-sm text-primary-500">
											20,000 /per month</div>
										<div className="w-full text-center mt-1 inline-block text-base">Requests</div>
									</div>
								</div>
							</div>
							<div className="w-full mt-4 grid grid-cols-2 gap-2 items-center">
								<div className="w-full flex items-center gap-2">
									<span className="w-3 h-3 inline-block border-2 border-primary-400 rounded-full"></span>
									<div className="text-base">New: 5.7K</div>
								</div>
								<div className="w-full flex items-center justify-end gap-2">
									<span className="w-3 h-3 inline-block border-2 border-primary-800 rounded-full"></span>
									<div className="text-base">Returning: 7.3K</div>
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