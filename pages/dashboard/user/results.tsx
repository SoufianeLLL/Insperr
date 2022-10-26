import useSWR from "swr"
// import { useEffect } from "react"
import Loading from "@/components/Loading"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"


const QuotesGeneratorResults = ({ resultIDs }) => {

	const { isValidating, data: Quotes } = useSWR(`/api/quote/auth?number=${20}&action=getQuotes`)

	// useEffect(() => {
	// 	document.body.classList.remove("bg-slate-100")
	// 	return () => document.body.classList.add("bg-slate-100")
	// }, [])
	
	return <>
		<section className="w-full 2xl:px-0 max-w-7xl">
			<div className="w-full pb-3 overflow-hidden">
				<div className="heading w-full">
					<div className="text-xl md:text-2xl font-semibold w-full flex items-center gap-3">Results</div>
				</div>
				<div className="w-full mt-5">
					{isValidating ? <div className="w-full text-center my-12">
						<Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div> 
					:
					Quotes?.map((quote, i) => {
						return <div key={i} className="bg-white w-full border border-slate-200 px-3 py-2 md:px-6 md:py-4 mb-4 rounded-lg">
							<div className="w-full">
								<div className="text-base mb-0.5 opacity-60">ID:</div>
								<div className="shrink w-full">{quote?.result_id}</div>
							</div>
							<div className="w-full mt-3">
								<div className="text-base mb-0.5 opacity-60">Quote:</div>
								<div className="shrink w-full" 
									dangerouslySetInnerHTML={{ __html: quote?.content?.replace(/\n/g, '<br>') }} />
							</div>
						</div>
					})}
				</div>
			</div>
		</section>
	</>
}


QuotesGeneratorResults.getInitialProps = async ({ 'query': {resultIDs} }) => {
	if (resultIDs) {
		return { resultIDs }
	}
	else {
		return {
			redirect: {
				permanent: false,
				destination: "/"
			}
		}
	}
}

QuotesGeneratorResults.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default QuotesGeneratorResults