import useSWR from 'swr'
import { useState } from "react"
import Head from 'next/head'
import Link from "next/link"
import dynamic from 'next/dynamic'
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"
import QuoteContainer from '@/components/Containers/QuoteContainer'
import { Skeleton } from '@/components/Skeleton'

const ShowToast = dynamic(() => import("@/components/ShowToast"))


const IndexPage = () => {

	const [callbackToast, setCallbackToast] = useState({ status: null, text: null })
	let { isValidating, data: CustomQuotes } = useSWR(`/api/quote?number=${20}&action=getRandomCustomQuotes`)

	return <>
		<Head>
			<meta name="description" content="Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories." />
			<meta property="og:site_name" content="Insperr" />
			<meta property="og:title" content="Insperr" />
			<meta property="og:description" content="Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories." />
			<meta property="og:image" content="https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/home.png" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://insperr.com" />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content="Insperr" />
			<meta name="twitter:description" content="Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories." />
			<meta name="twitter:url" content="https://insperr.com" />
			<meta name="twitter:image" content="https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/home.png" />
			<link rel="canonical" href="https://insperr.com" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@context": "http://schema.org",
						"@graph": [
							{
								"@type": "WebApplication",
								"@id": "insperr",
								"applicationCategory": "BusinessApplication",
								"name": "Insperr",
								"description": "Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories.",
								"operatingSystem": "all",
								"browserRequirements": "Requires Javascript and HTML5 support",
								"url": "https://insperr.com",
								"screenshot": "https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/home.png",
								"offers": {
									"@type": "AggregateOffer",
									"offeredBy": {
										"@type": "Organization",
										"name":"Insperr"
									},
									"highPrice": "29.99",
									"lowPrice": "0",
									"offerCount": "9999",
									"priceCurrency": "USD",
									"priceSpecification": [
										{
											"@type": "UnitPriceSpecification",
											"price": "0.00",
											"priceCurrency": "USD",
											"name": "Free"
										},
										{
											"@type": "UnitPriceSpecification",
											"price": "8.99",
											"priceCurrency": "USD",
											"name": "Pro",
											"referenceQuantity": {
												"@type": "QuantitativeValue",
												"value": "1",
												"unitCode": "MON"
											}
										},
										{
											"@type": "UnitPriceSpecification",
											"price": "14.99",
											"priceCurrency": "USD",
											"name": "Elite",
											"referenceQuantity": {
												"@type": "QuantitativeValue",
												"value": "1",
												"unitCode": "MON"
											}
										},
										{
											"@type": "UnitPriceSpecification",
											"price": "29.99",
											"priceCurrency": "USD",
											"name": "Entreprise",
											"referenceQuantity": {
												"@type": "QuantitativeValue",
												"value": "1",
												"unitCode": "MON"
											}
										}
									]
								},
								"creator": {
									"@type": "Person",
									"@id": "#insperr",
									"url": "https://loudaini.dev",
									"name": "Soufiane Loudaini",
									"email": "cm@loudaini.dev",
								}
							},
							{
								"@type": "Organization",
								"name": "Insperr",
								"url" : "https://insperr.com",
								"logo": "https://bgrlgcryhzmokadamxuz.supabase.co/storage/v1/object/public/structured-data/insperr_avatar.png",
								"email": "support(at)insperr.com",
								"description": "Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories.",
							}
						]
					}
				) }} />
		</Head>
		{(callbackToast?.status && callbackToast?.text) && 
			<ShowToast onClick={(e) => setCallbackToast(e)} type={callbackToast?.status} text={callbackToast?.text} />}
		<section className="w-full relative bg-white dark:bg-zinc-900">
			<div className="w-full py-20 px-5 md:px-10 2xl:px-0 max-w-4xl mx-auto">
				<div className="text-center w-full text-primary-500 fontNormal text-xl uppercase">Automation & Schedule</div>
				<div className="mt-2 w-full text-center">
					<div className="text-2xl md:text-3xl lg:text-4xl leading-tight normal-case fontSemiBold w-full">
						Connect with Twitter
					</div>
					<div className="mt-4 w-full text-center text-slate-400 dark:text-zinc-600 dark:zinc-600">
						Create tweets, threads and polls with Insperr and let us handle the rest we'll make sure your posts look great.
					</div>
				</div>
				<div className="mt-12 w-full flex items-center justify-center gap-12">
					<svg className="w-12 h-12 text-slate-300" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M24 4.309a9.83 9.83 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.196 4.925 4.925 0 0 0-8.39 4.49A13.974 13.974 0 0 1 1.671 2.9a4.902 4.902 0 0 0-.667 2.476c0 1.708.869 3.216 2.191 4.099A4.936 4.936 0 0 1 .964 8.86v.06a4.926 4.926 0 0 0 3.95 4.829 4.964 4.964 0 0 1-2.224.085 4.93 4.93 0 0 0 4.6 3.42 9.886 9.886 0 0 1-6.115 2.107c-.398 0-.79-.023-1.175-.068a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.503 14.009-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.309"></path></svg>
				</div>
			</div>
		</section>
		<section className="w-full relative bg-slate-50 dark:bg-black">
			<div className="w-full py-20 px-5 md:px-10 2xl:px-0 max-w-4xl mx-auto">
				<div className="text-center w-full text-primary-500 fontNormal text-xl uppercase">Quality & Speed</div>
				<div className="mt-2 w-full text-center">
					<div className="text-2xl md:text-3xl lg:text-4xl leading-tight normal-case fontSemiBold w-full">
						Write better. Build followers.
					</div>
					<div className="mt-4 w-full text-center text-slate-400 dark:text-zinc-600 dark:zinc-600">
						Build a strong personal brand and grow your audience. Get access to <span className="text-black dark:text-white font-semibold">unlimited original content</span> written in your exact personal writing style.
					</div>
				</div>
			</div>
			<div className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
				<div className="w-full pb-20 overflow-hidden">
					{/* <div className="heading w-full">
						<div className="text-sm md:text-base w-full">
							<span className="text-slate-400 dark:text-zinc-600">Custom Quotes</span>
						</div>
					</div> */}
					<div className="mt-4 w-full">
						{isValidating ? 
							<div className="w-full columns-1 md:columns-2 xl:columns-3 gap-x-6 gap-y-2 py-2"><Skeleton /></div> :
							(CustomQuotes && CustomQuotes?.length > 0) && 
								<div className="w-full columns-1 md:columns-2 xl:columns-3 gap-x-6 gap-y-2 py-2">
									{CustomQuotes?.map((quote, i) => {
										return <QuoteContainer key={i} id={i} quote={quote} callback={(e) => setCallbackToast(e)} />
									})}
								</div>}
					</div>
				</div>
			</div>
		</section>
		<section className="w-full relative px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="mt-6 w-full py-20 dark:bg-zinc-900 dark:rounded-2xl">
				<div className="text-center w-full text-primary-400 fontNormal text-xl uppercase">Get started for free</div>
				<div className="mt-2 w-full text-center">
					<div className="text-2xl md:text-3xl lg:text-4xl leading-tight normal-case fontSemiBold w-full">
						Let's discover your style? <br/> Start with <span className="text-primary-500">free</span> now.
					</div>
					<Link
                        href="/access?op=signin"
                        className="mt-8 w-auto inline-block text-white cursor-pointer mx-auto transition duration-200 transform scale-100 hover:scale-110 shadow-lg bg-primary-500 hover:bg-primary-700 py-4 px-8 text-xl rounded-full">
						Get Started</Link>
				</div>
			</div>
		</section>
	</>;
}

IndexPage.getLayout = (page) => <UnauthenticatedLayout home={true}>{page}</UnauthenticatedLayout>

export default IndexPage