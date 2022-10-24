import useSWR, { useSWRConfig } from "swr"
import { useState } from "react"
import Skeleton from "@/components/Skeleton"
import ShowToast from "@/components/ShowToast"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import QuoteContainer from "@/components/Containers/QuoteContainer"


const BookmarksPage = () => {

	const { mutate } = useSWRConfig()
	let url = `/api/saves?action=Read`, 
		{ isValidating, data: CustomQuotes } = useSWR(url)

	const [Callback, setCallback] = useState({ status: null, text: null })

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full">
			<div className="w-full">
				<div className="w-full mb-8 text-base md:text-xl">
					✨ Recent Quotes added to your Bookmarks
				</div>
				<div className="mt-8 w-full">
					{isValidating ? 
						<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 py-2"><Skeleton /></div> :
						(CustomQuotes && CustomQuotes?.length > 0) ? 
							<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 py-2">
								{CustomQuotes?.map((quote, i) => {
									return <QuoteContainer 
										key={i} 
										id={i} 
										quote={quote} 
										mutate={(id) => mutate(url)}
										callback={(e) => setCallback(e)} />
								})}
							</div> : 
						<div className="w-full text-center border border-slate-200 rounded-lg px-5 md:px-10 py-12 md:py-24">
							<svg width="80" height="80" viewBox="0 0 24 24" className="text-slate-200 mx-auto mb-4 w-32 h-32"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 4a2 2 0 1 1 4 0v6h6v4H4v-4h6V4zM4 14h16v8H4v-8zm12 8v-5.635M8 22v-5.635M12 22v-5.635"></path></svg>
							You don't have any Quotes saved on bookmarks.
						</div>}
				</div>
			</div>
		</section>
	</>
}

BookmarksPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default BookmarksPage