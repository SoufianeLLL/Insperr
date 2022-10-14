import { useState } from "react"
import useSWR from 'swr'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import ShowToast from '@/components/ShowToast'
import Skeleton from '@/components/Skeleton'
import Link from "next/link"



const IndexPage = () => {

	const [Callback, setCallback] = useState({ status: null, text: null })
	const URL = (target) => `/api/quote?number=${20}&target=${target}&action=getRandomQuotes`
	
	let { data: CustomQuotes } = useSWR(URL('custom'))
	
	/**
	 * Using cache supafast
	 * 
	 * const { cache } = useSWRConfig()
	 * 
	 * let RealQuotesURI = `/api/quote?number=${20}&target=database&action=getRandomQuotes`, 
	 * RealQuotes = cache.get(RealQuotesURI) ?? useSWR(RealQuotesURI)?.data
	 */

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full relative bg-white">
			<div className="w-full py-20 px-5 md:px-10 2xl:px-0 max-w-4xl mx-auto">
				<div className="text-center w-full text-primary-400 fontNormal text-xl uppercase">Quality & Speed</div>
				<div className="mt-2 w-full text-center">
					<div className="text-2xl md:text-3xl lg:text-4xl leading-tight normal-case fontSemiBold w-full">
						Write better. Build followers.
					</div>
					<div className="mt-4 w-full text-center text-slate-400">
						Build a strong personal brand and grow your audience. Get access to <span className="text-black font-semibold">unlimited original content</span> written in your exact personal writing style.
					</div>
				</div>
			</div>
		</section>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-20 overflow-hidden">
				<div className="heading w-full">
					<h2 className="w-full text-2xl md:text-4xl mb-2 fontSemiBold">Random</h2>
					<div className="text-sm md:text-base w-full">
						<span className="text-slate-400">Custom Quotes</span>
					</div>
				</div>
				<div className="mt-8 w-full">
					<div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
						{CustomQuotes && CustomQuotes?.length > 0 ? CustomQuotes?.map((quote, i) => {
							return <QuoteContainer key={i} id={i} quote={quote} callback={(e) => setCallback(e)} />
						})
						: <Skeleton />}
					</div>
				</div>
			</div>
		</section>
		<section className="w-full relative px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full border-2 border-slate-100 rounded-xl py-20">
				<div className="text-center w-full text-primary-400 fontNormal text-xl uppercase">Get started for free</div>
				<div className="mt-2 w-full text-center">
					<div className="text-2xl md:text-3xl lg:text-4xl leading-tight normal-case fontSemiBold w-full">
						Let's discover your style? <br/> Start with <span className="text-primary-400">free credits</span> now.
					</div>
					<Link href="/access?op=signin"><a className="mt-8 w-auto inline-block text-white cursor-pointer mx-auto transition duration-200 transform scale-100 hover:scale-110 shadow-lg bg-primary-500 hover:bg-primary-700 py-4 px-8 text-xl rounded-full">
						Get Started</a></Link>
				</div>
			</div>
		</section>
	</>
}

IndexPage.getLayout = (page) => <UnauthenticatedLayout home={true}>{page}</UnauthenticatedLayout>

export default IndexPage