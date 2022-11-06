import useSWR from "swr"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useSessionContext } from "@supabase/auth-helpers-react"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import Loading from "@/components/Loading"



const ResultPage = ({ result_id }) => {

	const router = useRouter()
	const { supabaseClient } = useSessionContext()
	const [voted, setVoted] = useState(false)

	// Get the result from database by result_id
	const { data: result, isValidating } = useSWR(`/api/ai/result/${result_id}`)

	useEffect(() => {
		document.body.classList.remove("bg-slate-100")
		if (result?.error) {
			router.push('/')
		}
		return () => document.body.classList.add("bg-slate-100"); document.body.classList.add("dark:bg-slate-900"); setVoted(false)
	}, [])

	const setSatisfaction = async (emj) => {
		if (emj) {
			setVoted(emj)
			await supabaseClient
				.from('quotes_satisfaction')
				.insert({
					quote_id: result_id,
					satisfaction: emj
				})
		}
	}

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
									<div className="w-full font-somibold text-base dark:text-zinc-400">Result ID:</div>
									<div className="w-full mt-1 text-base md:text-lg capitalize">{result?.result_id}</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base dark:text-zinc-400">Topic:</div>
									<div className="w-full mt-1 text-lg md:text-xl font-semibold capitalize">{result?.topics}</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base dark:text-zinc-400">Keyword ({result?.place === 'startwith' ? 'Start with' : 'Contains'}):</div>
									<div className="w-full mt-1 text-lg md:text-xl font-semibold capitalize">
										{result?.keyword}
									</div>
								</div>
								<div className="w-full mt-5">
									<div className="w-full font-somibold text-base dark:text-zinc-400">Result:</div>
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
								{!result?.tweet_metadata?.status ? 
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
								result?.tweet_metadata?.status === 'deleted' ? 
									<div className="w-full">
										<div className="w-full mt-2 text-base inline-block">
											<div className="float-left mr-2 text-red-600">
												<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
											</div>
											<div className="float-left">This tweet was deleted</div>
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
			{!isValidating && !voted ? 
				<div className="emojis w-full inline-block mt-12">
					<div className="flex items-center gap-3 justify-center w-full geist-emoji-selector shown">
						<button onClick={() => !result?.quotes_satisfaction[0]?.satisfaction && setSatisfaction('useless')} type="button" className={`border-0 outline-0 focus:ring-0 bg-transparent p-1 transition-all ${result?.quotes_satisfaction[0]?.satisfaction === 'useless' ? 'scale-125 grayscale-0' : !result?.quotes_satisfaction[0]?.satisfaction ? 'hover:scale-125 hover:grayscale-0' : 'grayscale'} transform option`}>
							<Image 
								alt="useless"
								placeholder="blur"
								blurDataURL="../../../../../public/images/avatar.jpg"
								unoptimized={true}
								width={24}
								height={24}
								src="https://assets.vercel.com/twemoji/1f62d.svg" />
						</button>
						<button onClick={() => !result?.quotes_satisfaction[0]?.satisfaction && setSatisfaction('not bad')} type="button" className={`border-0 outline-0 focus:ring-0 bg-transparent p-1 transition-all ${result?.quotes_satisfaction[0]?.satisfaction === 'not bad' ? 'scale-125 grayscale-0' : !result?.quotes_satisfaction[0]?.satisfaction ? 'hover:scale-125 hover:grayscale-0' : 'grayscale'} transform option`}>
							<Image 
								alt="not bad"
								placeholder="blur"
								blurDataURL="../../../../../public/images/avatar.jpg"
								unoptimized={true}
								width={24}
								height={24}
								src="https://assets.vercel.com/twemoji/1f615.svg" />
						</button>
						<button onClick={() => !result?.quotes_satisfaction[0]?.satisfaction && setSatisfaction('good')} type="button" className={`border-0 outline-0 focus:ring-0 bg-transparent p-1 transition-all ${result?.quotes_satisfaction[0]?.satisfaction === 'good' ? 'scale-125 grayscale-0' : !result?.quotes_satisfaction[0]?.satisfaction ? 'hover:scale-125 hover:grayscale-0' : 'grayscale'} transform option`}>
							<Image 
								alt="good"
								placeholder="blur"
								blurDataURL="../../../../../public/images/avatar.jpg"
								unoptimized={true}
								width={24}
								height={24}
								src="https://assets.vercel.com/twemoji/1f600.svg" />
						</button>
						<button onClick={() => !result?.quotes_satisfaction[0]?.satisfaction && setSatisfaction('amazing')} type="button" className={`border-0 outline-0 focus:ring-0 bg-transparent p-1 transition-all ${result?.quotes_satisfaction[0]?.satisfaction === 'amazing' ? 'scale-125 grayscale-0' : !result?.quotes_satisfaction[0]?.satisfaction ? 'hover:scale-125 hover:grayscale-0' : 'grayscale'} transform option`}>
							<Image 
								alt="amazing"
								placeholder="blur"
								blurDataURL="../../../../../public/images/avatar.jpg"
								unoptimized={true}
								width={24}
								height={24}
								src="https://assets.vercel.com/twemoji/1f929.svg" />
						</button>
					</div>
				</div>
			: !isValidating && <div className="w-full text-center text-base text-slate-600 inline-block mt-12">Thank you for sending your feedbak.</div>}
		</section>
	</>
}


ResultPage.getInitialProps = async ({ 'query': {result_id} }) => { return { result_id } }

ResultPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default ResultPage