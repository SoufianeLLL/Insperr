import useSWR from "swr"
import { useState } from "react"
import Skeleton from "@/components/Skeleton"
import BlueButton from "@/components/BlueButton"
import AuthenticatedLayout from "@/components/AuthenticatedLayout"
import QuoteContainer from "@/components/Containers/QuoteContainer"
import ShowToast from "@/components/ShowToast"


const CollectionsPage = () => {

	const [Callback, setCallback] = useState({ status: null, text: null })
	const URL = (target) => `/api/quote?number=${20}&target=${target}&action=getRandomQuotes`
	
	let { data: CustomQuotes } = useSWR(URL('custom'))

	return <>
		{(Callback?.status && Callback?.text) && 
			<ShowToast onClick={(e) => setCallback(e)} type={Callback?.status} text={Callback?.text} />}
		<section className="w-full overflow-hidden">
			<div className="w-full mb-8">
				<div className="heading w-full bg-slate-900 text-white p-5 md:p-10 rounded-xl">
					<div className="mb-2 py-1 px-3 text-sm border border-slate-600 rounded-full inline-block">Free Collection</div>
					<div className="text-2xl md:text-3xl font-semibold w-full">GPT-3 Quotes/Tweets Collection</div>
					<div className="text-base md:text-lg mt-4 w-full text-slate-500">
						Get <span className="font-semibold text-white">Premium Collection for $8</span> to access millions of Quotes & Tweets created by our users. New Quotes & Tweets getting added by the second. Free collection just has a few hundred in it.
					</div>
					<div className="mt-5 w-full flex justify-start">
						<BlueButton text="Get Premium Collection" smallSize={false} fullWidth={false} url="/pricing" />
					</div>
				</div>
			</div>
			<div className="w-full">
				<div className="w-full mb-8 text-base md:text-xl">
					🤖 Have a look at these interesting Quotes
				</div>
				<div className="mt-8 w-full">
					<div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 py-2">
						{CustomQuotes && CustomQuotes?.length > 0 ? CustomQuotes?.map((quote, i) => {
							return <QuoteContainer key={i} id={i} quote={quote} callback={(e) => setCallback(e)} />
						})
						: <Skeleton />}
					</div>
				</div>
			</div>
		</section>
	</>
}

CollectionsPage.getLayout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>

export default CollectionsPage