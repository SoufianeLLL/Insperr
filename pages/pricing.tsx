// import Link from "next/link"
import { useState } from "react"
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout"


const PricingPage = () => {

	const [isMonthly, setPeriod] = useState(true)

	return <>
		<section className="w-full px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto">
			<div className="w-full my-10 overflow-hidden">
				<div className="heading w-full">
					<div className="text-2xl text-center fontSemiBold md:text-3xl font-semibold w-full">Insperr Pricing & Plans</div>
					<div className="w-full mt-4 text-xl md text-2xl text-center px-10 max-w-3xl mx-auto">
						Be inspired by thousands of Quotes. Use the Quotes AI Generator to find the best Quotes for you.
					</div>
				</div>
				<div className="w-full mt-10">
					<div className="w-full flex items-center justify-center gap-4">
						<div onClick={() => setPeriod(true)} className={`${isMonthly ? 'font-bold' : 'opacity-60'} cursor-pointer text-base`}>Monthly</div>
						<div className={`${isMonthly ? 'bg-slate-300' : 'bg-primary-500'} w-14 h-8 cursor-pointer rounded-full relative`}>
							<span className={`${isMonthly ? 'translate-x-0' : 'translate-x-6'} transform left-1 bg-white absolute transition duration-200 top-1 h-6 w-6 rounded-full`}></span>
						</div>
						<div onClick={() => setPeriod(false)} className={`${!isMonthly ? 'font-bold' : 'opacity-60'} cursor-pointer text-base`}>Annual</div>
					</div>
					<div className="w-full mt-12">
						<div className="max-w-5xl px-5 md:px-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="w-full p-6 md:p-10 rounded-2xl">
								<h4 className="w-full fontNormal text-center text-lg md:text-xl uppercase">Free</h4>
								<h2 className="w-full mt-6 fontBold text-center text-2xl md:text-4xl">$0</h2>
								<div className="h-4 w-full mt-2 uppercase text-center text-xs"></div>
								{!isMonthly && <div className="h-4 w-full mt-2 uppercase text-center text-xs"></div>}
								<div className="w-full mt-6 h-10"></div>
								<div className="w-full mt-6">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">10 Quotes per day</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Unlimited Exports</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Export with Watermarks</div>
									</div>
								</div>
							</div>
							<div className="w-full p-6 md:p-10 bg-primary-50 rounded-2xl">
								<h4 className="w-full fontNormal text-center text-lg md:text-xl uppercase">Pro</h4>
								<h2 className="w-full mt-6 fontBold text-center text-2xl md:text-4xl">${isMonthly ? '5' : '3.25'}</h2>
								<div className="h-4 w-full mt-2 uppercase text-center text-xs">per month</div>
								{!isMonthly && <div className="h-4 w-full mt-2 uppercase text-center text-xs">billed <span className="underline">$39</span> annually</div>}
								<div className="w-full mt-6 h-10">
									<button className="border-2 border-primary-500 bg-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 transition duration-200 text-base cursor-pointer rounded-lg w-full text-center py-2 px-4">Upgrade to Pro</button>
								</div>
								<div className="w-full mt-6">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Unlimited Quotes</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Remove Watermarks</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Custom Watermarks</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Unlimited Exports</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Save Quotes</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Share Bokmarks</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">API Access</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Priority Support</div>
									</div>
								</div>
							</div>
							<div className="w-full p-6 md:p-10 rounded-2xl">
								<h4 className="w-full fontNormal text-center text-lg md:text-xl uppercase">Lifetime</h4>
								<h2 className="w-full mt-6 fontBold text-center text-2xl md:text-4xl">$24</h2>
								<div className="h-4 w-full mt-2 uppercase text-center text-xs">For ever</div>
								{!isMonthly && <div className="h-4 w-full mt-2 uppercase text-center text-xs"></div>}
								<div className="w-full mt-6 h-10">
									<button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-600 hover:border-primary-600 hover:text-white transition duration-200 text-base cursor-pointer rounded-lg w-full text-center py-2 px-4">Upgrade to Lifetime</button>
								</div>
								<div className="w-full mt-6">
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">All Pro features</div>
									</div>
									<div className="w-full mt-2 text-base inline-block">
										<div className="float-left mr-2 text-primary-600">
											<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" focusable="false" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
										</div>
										<div className="float-left">Priority Support</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mt-8 w-full text-center text-base">All payments are proccessed & secured by <span className="fontSemiBold">Stripe</span></div>
					</div>
				</div>
			</div>
		</section>
		<section className="mt-32 mb-12 px-5 md:px-10 2xl:px-0 max-w-7xl mx-auto w-full">
			<h2 className="w-full text-center text-xl md text-3xl fontSemiBold">Frequently Asked Questions</h2>
			<div className="md:px-10 w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Who is behind Insperr?</div>
					<div className="w-full text-base text-slate-700">Hi! I’m Jim. I’ve created Insperr to solve my own pain. As a creator, I used to create multiple social media graphics (for Twitter mostly) per day. I’ve noticed that it took me far too long time - even though I was a designer - and wondered: “How people with no design skills create graphics. I need to build sth for them”. And here, we are!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Can I cancel my plan anytime?</div>
					<div className="w-full text-base text-slate-700">I’m an independent fulltime creator who builts small products, like Insperr. I don’t take external funding because I want to only answer to our members & supporters. The subscriptions allow me to focus on building new features and make the product better every single day. Your support is valuable for Insperr’s future!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Do you offer discounts?</div>
					<div className="w-full text-base text-slate-700">We offer discounts only for our members and only on specific occasions. Then, the best way to get a discount it to follow us on Twitter and create an account. If you have a blog/newsletter, you can write a post about Insperr and get 2 months for free!</div>
				</div>
				<div className="w-full">
					<div className="text-lg md:text-xl font-semibold w-full mb-2">Do you offer refunds?</div>
					<div className="w-full text-base text-slate-700">You can request a refund for your purchase if you request it within 24 hours of the transaction.</div>
				</div>
			</div>
		</section>
	</>
}


PricingPage.getLayout = (page) => <UnauthenticatedLayout>{page}</UnauthenticatedLayout>

export default PricingPage