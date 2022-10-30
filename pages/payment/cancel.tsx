import Link from 'next/link'
import Head from 'next/head'
import stripe from '@/utils/stripejs'


const CancelPayment = ({ session }) => {

	return <>
		<Head>
			<title>Insperr - Payment Successful</title>
		</Head>
		<div className="w-ful flex items-center justify-center h-screen bg-slate-100 overflow-hidden px-5 md:px-10">
			<div className="w-full shadow max-w-xl rounded-lg bg-white p-5 md:p-10 mx-auto">
				<div className="w-full text-center">
					<svg className="text-red-500 w-14 h-14 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
					<div className="text-red-500 w-full mt-4 font-semibold text-xl md:text-2xl">
						Payment Canceled!
					</div>
				</div>
				<div className="-mx-10 relative h-20">
					<div className="absolute border-t-2 border-slate-200 border-dashed top-1/2 left-20 right-20"></div>
					<div className="absolute h-10 w-10 -mt-5 -ml-1 md:-ml-5 rounded-full bg-slate-100 top-1/2 left-0 w-full"></div>
					<div className="absolute h-10 w-10 -mt-5 -mr-1 md:-mr-5 rounded-full bg-slate-100 top-1/2 right-0 w-full"></div>
				</div>
				<div className="w-full text-base md:text-lg">
					<div className="w-full flex items-center gap-3">
						<div className="w-full">Status:</div>
						<div className={`${(session?.payment_status)?.toLowerCase() === 'paid' ? 'text-green-500' : 'text-red-500'} w-full text-right`}>
							{session?.payment_status}</div>
					</div>
					<div className="w-full flex items-center gap-3 mt-1">
						<div className="w-full">Type:</div>
						<div className="text-primary-500 w-full text-right">{session?.mode}</div>
					</div>
					<div className="w-full flex items-center gap-3 mt-1">
						<div className="w-full">Amount paid:</div>
						<div className="w-full text-right">
							{(session?.amount_total / 100).toFixed(2)} <span className="uppercase">{session?.currency}</span>
						</div>
					</div>
					<div className="w-full flex items-center gap-3 mt-1">
						<div className="w-full">Name:</div>
						<div className="w-full text-right">{session?.customer_details?.name}</div>
					</div>
					<div className="w-full flex items-center gap-3 mt-1">
						<div className="w-full">Email address:</div>
						<div className="w-full text-right">{session?.customer_details?.email}</div>
					</div>
				</div>
				<div className="w-full mt-6 justify-center text-sm text-slate-400 flex items-center gap-2">
					You can close this window - <Link href="/dashboard" className="text-primary-600 underline">Dashboard</Link>
				</div>
			</div>
		</div>
	</>;
}

// CancelPayment.getInitialProps = async ({ query }) => {
export const getServerSideProps = async ({ query }) => {
	if (query?.session_id) {
		const session = await stripe.checkout.sessions.retrieve(query?.session_id)
		return {
			props: {
				session
			}
		}
	}
	return {
		redirect: {
			permanent: false,
			destination: "/"
		}
	}
}

export default CancelPayment