import useSWR from "swr"
import Link from "next/link"
import Head from "next/head"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js/pure"
import { useSessionContext, useUser } from "@supabase/auth-helpers-react"
import stripe from "@/utils/stripejs"
import { Settings } from "@/utils/settings"
import Loading from "@/components/Loading"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"



const PricingPage = ({ plans, price_id }) => {

	const user = useUser() // Authenticated user
	const { isLoading } = useSessionContext()

	const { data: subscription } = useSWR('/api/user/subscription')

	const [loadingStripe, setLoadingStripe] = useState(false)
	const Plans = Settings?.products
	const freePlan = Settings?.products.find((itm) => { return (itm.id)?.toLowerCase() === 'free' })

	useEffect(() => {
		if (price_id) {
			runStripe(price_id)
		}
	}, [])

	const runStripe = async (priceId) => {
		setLoadingStripe(true)
		const result = await fetch(`/api/stripe/customer/subscription/${priceId}`)
		const res = await result?.json()
		if (res?.id) {
			setLoadingStripe(false)
			const stripe = await loadStripe(process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
			await stripe.redirectToCheckout({ sessionId: res?.id })
		}
	}

	return <>
		<Head>
            <link rel="canonical" href="https://insperr.com/pricing" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(
					{
						"@type": "WebApplication",
						"@id": "insperr",
						"applicationCategory": "BusinessApplication",
						"name": "Insperr",
						"description": "Insperr is a simple online tool with which you can generate thousands of quotes sorted by category. You can choose from different categories.",
						"operatingSystem": "all",
						"browserRequirements": "Requires Javascript and HTML5 support",
						"url": "https://insperr.com",
						"screenshot": "https://lbthopsukieuyitlwkmw.supabase.co/storage/v1/object/public/structured-data/home.png",
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
					}
				)}}
			/>
        </Head>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10 overflow-hidden">
				<div className="heading w-full">
					<div className="text-2xl text-center fontSemiBold md:text-3xl font-semibold w-full">Insperr Pricing & Plans</div>
					<div className="w-full mt-4 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">
						Be inspired by thousands of Quotes. Use the Quotes AI Generator to find the best Quotes for you.
					</div>
				</div>
				<div className="w-full mt-10">
					<div className="w-full mt-12">
						<div className="w-full max-w-5xl px-5 md:px-10 mx-auto">
							<div className="w-full text-center border-t border-slate-200 dark:border-zinc-800 p-6 md:p-10 mb-12 px-5">
								<h2 className="w-full fontBold text-center text-xl md:text-2xl uppercase">Free Plan</h2>
								<div className="w-full mt-2">
									{freePlan && <div>
										Free plan is <span className="font-semibold">limited</span> to 
										<span className="font-semibold">{freePlan?.quotes}</span> Quotes <span className="text-sm">/month</span>.
									</div>}
									<div className="w-full mt-1">API access and Twitter AutoPost not included.</div>
								</div>
							</div>
							{!plans ? 
							<div className="w-full text-center my-24"><Loading text="" scpace='0 auto' borderWidth={3} width={50} height={50} /></div>
							: 
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{plans?.map((plan, i) => {
									if (plan?.active) {
										return (
											<div key={plan?.id} className={`w-full p-6 md:p-10 ${i===1 && 'bg-primary-50 dark:bg-primary-900 rounded-2xl'}`}>
												<h4 className="w-full fontNormal text-center text-lg md:text-xl uppercase">{plan?.name}</h4>
												<h2 className="w-full mt-6 fontBold text-center text-2xl md:text-4xl">
													${(plan?.price)?.toString()}
												</h2>
												<div className="h-4 w-full mt-2 uppercase text-center text-xs">per month</div>
												{(!isLoading && !loadingStripe) ?
													<div className="w-full mt-6 h-10">
														{user ? 
															subscription ? 
																subscription?.product_id === plan.id && 
																	<Link href="/dashboard/user/account" className={`${i===1 ? 'bg-primary-500 text-white' : 'hover:text-white text-primary-500'} border-2 border-primary-500 hover:bg-primary-600 hover:border-primary-600 transition duration-200 text-base cursor-pointer rounded-lg w-full inline-block text-center py-2 px-4`}>
																		Manage Subscription</Link>
															:
															<button onClick={() => runStripe(plan?.price_id)} className={`${i===1 ? 'bg-primary-500 text-white' : 'hover:text-white text-primary-500'} border-2 border-primary-500 hover:bg-primary-600 hover:border-primary-600 transition duration-200 text-base cursor-pointer rounded-lg w-full text-center py-2 px-4`}>
																Upgrade to {plan?.name}</button>
														:
														<Link href={`/access?op=signup&redirect=${process.env.NEXT_PUBLIC_URL_HOME}/pricing?p=${plan?.price_id}`} className={`${i===1 ? 'bg-primary-500 text-white' : 'hover:text-white text-primary-500'} border-2 border-primary-500 hover:bg-primary-600 hover:border-primary-600 transition duration-200 text-base cursor-pointer rounded-lg w-full inline-block text-center py-2 px-4`}>
															Create new account</Link>
														}
													</div>
												:
													<div className="w-full text-center my-4"><Loading text="" scpace='0 auto' borderWidth={2} width={30} height={30} /></div>}
												{Plans?.map((item, x) => {
													if (item?.id === plan?.id) return <div key={x}>
														<div className="w-full mt-6">
															<div className="w-full mt-2 text-base inline-block">
																<div className="float-left mr-2 text-primary-600">
																	<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
																</div>
																<div className="float-left"><span className="font-semibold">{(item?.quotes)?.toString()}</span> Quotes</div>
															</div>
														</div>
														{item?.api && <>
															<div className="w-full">
																<div className="w-full mt-2 text-base inline-block">
																	<div className="float-left mr-2 text-primary-600">
																		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
																	</div>
																	<div className="float-left">API access</div>
																</div>
															</div>
															<div className="w-full">
																<div className="w-full mt-2 text-base inline-block">
																	<div className={`ml-2 float-left mr-2 rounded-full`}>???</div>
																	<div className="float-left"><span className="font-semibold">Read</span>: {item?.requests?.read} request</div>
																</div>
															</div>
															<div className="w-full">
																<div className="w-full mt-2 text-base inline-block">
																	<div className={`ml-2 float-left mr-2 rounded-full`}>???</div>
																	<div className="float-left"><span className="font-semibold">Create</span>: {item?.requests?.create} request</div>
																</div>
															</div>
															{item?.autoPost && 
															<div className="w-full">
																<div className="w-full mt-2 text-base inline-block">
																	<div className="float-left mr-2 text-primary-600">
																		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
																	</div>
																	<div className="float-left">Twitter AutoPost</div>
																</div>
															</div>}
															{item?.priority_support && 
															<div className="w-full">
																<div className="w-full mt-2 text-base inline-block">
																	<div className="float-left mr-2 text-primary-600">
																		<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
																	</div>
																	<div className="float-left">Priority Support</div>
																</div>
															</div>}
														</>}
													</div>
												})}
											</div>
										);
									}
									return null
								})}
							</div>}
						</div>
						<div className="mt-8 w-full text-center text-base">All payments are processed & secured by <span className="fontSemiBold">Stripe</span></div>
					</div>
				</div>
			</div>
		</section>
		<section className="mt-32 mb-12 px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto w-full">
			<h2 className="w-full text-center text-xl md text-3xl fontSemiBold">Frequently Asked Questions</h2>
			<div className="md:px-10 w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Who is behind Insperr?</div>
					<div className="w-full text-base text-slate-700 dark:text-zinc-800">Hi! I???m Jim. I???ve created Insperr to solve my own pain. As a creator, I used to create multiple social media graphics (for Twitter mostly) per day. I???ve noticed that it took me far too long time - even though I was a designer - and wondered: ???How people with no design skills create graphics. I need to build sth for them???. And here, we are!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Can I cancel my plan anytime?</div>
					<div className="w-full text-base text-slate-700 dark:text-zinc-800">I???m an independent fulltime creator who builts small products, like Insperr. I don???t take external funding because I want to only answer to our members & supporters. The subscriptions allow me to focus on building new features and make the product better every single day. Your support is valuable for Insperr???s future!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Do you offer discounts?</div>
					<div className="w-full text-base text-slate-700 dark:text-zinc-800">We offer discounts only for our members and only on specific occasions. Then, the best way to get a discount it to follow us on Twitter and create an account. If you have a blog/newsletter, you can write a post about Insperr and get 2 months for free!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Do you offer refunds?</div>
					<div className="w-full text-base text-slate-700 dark:text-zinc-800">You can request a refund for your purchase if you request it within 24 hours of the transaction.</div>
				</div>
			</div>
		</section>
	</>;
}

export async function getServerSideProps({ query }) {
	const { data: prices } = await stripe?.prices?.list()
	const plans = await Promise.all(prices.map(async (price) => {
		const product = await stripe?.products.retrieve(price?.product)
		return {
			id: product?.id,
			price_id: price?.id,
			active: product?.active,
			name: product?.name,
			price: (price?.unit_amount / 100)?.toFixed(2),
			currency: price?.currency,
			created: product?.created
		}
	}))
	return {
		props: {
			price_id: query?.p ?? null,
			plans
			// plans: plans.sort((a, b) => a.created - b.created)
		}
	}
}

PricingPage.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default PricingPage