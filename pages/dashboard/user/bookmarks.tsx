import useSWR from "swr"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/Skeleton"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import QuoteContainer from "@/components/Containers/QuoteContainer"

const ShowToast = dynamic(() => import("@/components/ShowToast"))


const BookmarksPage = () => {

	let { isValidating, data: CustomQuotes, mutate: mutateSaves } = useSWR(`/api/saves?action=Read`)

	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })

	useEffect(() => {
		document.body.classList.remove("bg-slate-100")
		return () => {
			document.body.classList.remove("bg-slate-100")
		}
	}, [])

	return <>
		{(callbackToast?.status && callbackToast?.text) && 
			<ShowToast onClick={(e) => setCallbackToast(e)} type={callbackToast?.status} text={callbackToast?.text} />}
		<div className="bg-slate-100 w-full p-5 md:p-10">
			<section className="w-full max-w-6xl">
				<div className="w-full">
					<div className="w-full text-base md:text-xl">
						✨ Recent Quotes added to your Bookmarks
					</div>
					<div className="mt-4 w-full">
						{isValidating ? 
							<div className="w-full columns-1 md:columns-2 gap-6 py-2"><Skeleton /></div> :
							(CustomQuotes && CustomQuotes?.length > 0) ? 
								<div className="w-full columns-1 md:columns-2 gap-6 py-2">
									{CustomQuotes?.map((quote, i) => {
										return <QuoteContainer 
											key={i} 
											id={i} 
											quote={quote} 
											mutate={(id) => mutateSaves()}
											callback={(e) => setCallbackToast(e)} />
									})}
								</div> : 
							<div className="w-full text-center border border-slate-200 rounded-lg px-5 md:px-10 py-12 md:py-24">
								<svg width="80" height="80" viewBox="0 0 24 24" className="text-slate-200 mx-auto mb-4 w-32 h-32"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 4a2 2 0 1 1 4 0v6h6v4H4v-4h6V4zM4 14h16v8H4v-8zm12 8v-5.635M8 22v-5.635M12 22v-5.635"></path></svg>
								You don't have any Quotes saved on bookmarks.
							</div>}
					</div>
				</div>
			</section>
		</div>
	</>
}

BookmarksPage.getLayout = (page) => <AuthenticatedLayout padding={false}>{page}</AuthenticatedLayout>

export default BookmarksPage