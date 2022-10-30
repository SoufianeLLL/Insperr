import useSWR from "swr"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import Loading from "@/components/Loading"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"



const ResultPage = ({ result_id }) => {

	const router = useRouter()

	// Get the result from database by result_id
	const { data: result, isValidating } = useSWR(`/api/ai/result/${result_id}`)

	useEffect(() => {
		document.body.classList.remove("bg-slate-100")
		if (result?.error) {
			router.push('/')
		}
		return () => document.body.classList.add("bg-slate-100")
	}, [])

	return <>
		<section className="w-full 2xl:px-0 max-w-7xl">
			<div className="w-full pb-3 overflow-hidden">
				{isValidating ? <div className="w-full max-w-sm h-screen mx-auto text-center">
					<Loading text="" width={50} height={50} /></div>
				:
				<>
					<div className="heading w-full">
						<div className="text-xl md:text-2xl font-semibold w-full flex items-center gap-3">
							<Link href="/dashboard/user/results">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg></Link>
							<div>Output Result</div>
						</div>
					</div>
					{!result?.error && 
					<div className="w-full mt-5">
						<div className="w-full lg:flex lg:items-start lg:gap-12 mt-5">
							<div className="shrink w-full rounded-xl">
								<div className="w-full mt-1">
									<div className="w-full font-somibold text-base">Result ID:</div>
									<div className="w-full mt-1 text-base md:text-lg capitalize">{result?.result_id}</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base">Topic:</div>
									<div className="w-full mt-1 text-lg md:text-xl font-semibold capitalize">{result?.topics}</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base">Keyword ({result?.place === 'startwith' ? 'Start with' : 'Contains'}):</div>
									<div className="w-full mt-1 text-lg md:text-xl font-semibold capitalize">
										{result?.keyword}
									</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base">Result:</div>
									<div className="w-full mt-1 text-lg md:text-xl">
										{result?.content}
									</div>
								</div>
							</div>
							<div className="flex-none lg:w-1/3 w-full lg:mt-0 mt-10">
								<div className="w-full">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-green-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">User authentication checked</div>
									</div>
								</div>
								<div className="w-full">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-green-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Subscription checked</div>
									</div>
								</div>
								<div className="w-full">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-green-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Account quota limitation checked</div>
									</div>
								</div>
								<div className="w-full">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-green-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Request validation checked</div>
									</div>
								</div>
								{!result?.tweeted ? 
									<div className="w-full">
										<div className="mt-6 mb-2 w-full text-base">Schedule within the next 5 minutes</div>
										<div className="w-full mt-2 text-base inline-block">
											<div className="float-left mr-2 text-primary-600">
												<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
											</div>
											<div className="float-left">Twtitter Auto-Post</div>
										</div>
									</div>
								:
									<div className="w-full">
										<div className="w-full mt-2 text-base inline-block">
											<div className="float-left mr-2 text-green-600">
												<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
											</div>
											<div className="float-left">Tweeted successfully</div>
										</div>
									</div>
								}
							</div>
						</div>
					</div>}
				</>}
			</div>
		</section>
	</>;
}

ResultPage.getInitialProps = async ({ 'query': {result_id} }) => { return { result_id } }

ResultPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default ResultPage