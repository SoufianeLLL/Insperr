import useSWR from "swr"
import { useState } from "react"
import { useUser } from "@supabase/auth-helpers-react"
import Skeleton from "@/components/Skeleton"
import ShowToast from "@/components/ShowToast"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import QuoteContainer from "@/components/Containers/QuoteContainer"


const BookmarksPage = () => {

	const { user } = useUser()	
	const [Callback, setCallback] = useState({ status: null, text: null })
	
	let { data: CustomQuotes } = useSWR(`/api/saves?action=Read&user_id=${user?.id}`)

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full overflow-hidden">
			<div className="w-full">
				<div className="w-full mb-8 text-base md:text-xl">
					✨ Recent Quotes added to your Bookmarks
				</div>
				<div className="mt-8 w-full">
					<div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 py-2">
						{CustomQuotes && CustomQuotes?.length > 0 ? CustomQuotes?.map((quote, i) => {
							return <QuoteContainer key={i} id={i} quote={{
                                id: quote?.quotes?.id,
                                content: quote?.quotes?.content,
                                users: quote?.users
                            }} callback={(e) => setCallback(e)} />
						})
						: <Skeleton />}
					</div>
				</div>
			</div>
		</section>
	</>
}

BookmarksPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default BookmarksPage