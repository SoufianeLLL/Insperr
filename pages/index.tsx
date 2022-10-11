import useSWR from 'swr'
import { useState } from "react"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import Skeleton from '@/components/Skeleton'



const IndexPage = () => {

	const [target, setTarget] = useState('custom')

	let CustomQuotes = []
	let { data: RealQuotes } = useSWR(`/api/quote?number=${20}&target=database&action=getRandomQuotes`)
	
	/**
	 * Using cache supafast
	 * 
	 * const { cache } = useSWRConfig()
	 * 
	 * let RealQuotesURI = `/api/quote?number=${20}&target=database&action=getRandomQuotes`, 
	 * RealQuotes = cache.get(RealQuotesURI) ?? useSWR(RealQuotesURI)?.data
	 */

	return <>
		<section className="w-full px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-20 overflow-hidden">
				<div className="heading w-full">
					<h2 className="w-full text-2xl md:text-4xl mb-2 fontSemiBold">Random</h2>
					<div className="text-lg md:text-xl w-full flex items-center gap-10">
						<span onClick={() => setTarget('custom')} 
							className={`cursor-pointer ${target === 'custom' ? 'font-semibold text-black underline' : 'text-zinc-400'}`}>Custom Quotes</span>
						<span onClick={() => setTarget('database')} 
							className={`cursor-pointer ${target === 'database' ? 'font-semibold text-black underline' : 'text-zinc-400'}`}>Real Quotes</span>
					</div>
				</div>
				<div className="mt-8 w-full">
					<div className="w-full columns-1 md:columns-2 lg:columns-3 gap-6">
						{target === 'database' && RealQuotes && RealQuotes?.length > 0 ? RealQuotes?.map((quote, i) => {
							return <QuoteContainer key={i} quote={quote} />
						}) 
						:
						target === 'custom' && CustomQuotes && CustomQuotes?.length > 0 ? CustomQuotes?.map((quote, i) => {
							return <QuoteContainer key={i} quote={quote} />
						})
						: <Skeleton />}
					</div>
				</div>
			</div>
		</section>
	</>
}

IndexPage.getLayout = (page) => <UnauthenticatedLayout home={true}>{page}</UnauthenticatedLayout>

export default IndexPage