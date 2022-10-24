import Head from 'next/head'
import stripe from '@/utils/stripejs'


const PaymentPage = ({ session, customer }) => {

	return <>
		<Head>
			<title>Insperr - Payment Successful</title>
		</Head>
		<div className="w-ful flex items-center justify-center h-screen bg-slate-100 overflow-hidden px-5 md:px-10">
			<div className="w-full shadow max-w-2xl rounded-lg bg-white p-5 md:p-10 mx-auto">
				<div className="w-full text-center">
					<svg className="text-green-500 w-14 h-14 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
					<div className="text-green-500 w-full mt-4 fontBold text-xl md:text-2xl">
						Payment Successfull!
					</div>
				</div>
				<div className="-mx-10 relative h-20">
					<div className="absolute border-t-2 border-slate-200 border-dashed top-1/2 left-20 right-20"></div>
					<div className="absolute h-10 w-10 -mt-5 -ml-5 rounded-full bg-slate-100 top-1/2 left-0 w-full"></div>
					<div className="absolute h-10 w-10 -mt-5 -mr-5 rounded-full bg-slate-100 top-1/2 right-0 w-full"></div>
				</div>
				<div className="w-full">
					<pre>{JSON?.stringify(session)}</pre><br />
					<pre>{JSON?.stringify(customer)}</pre>
				</div>
			</div>
		</div>
	</>
}

export const getServerSideProps = async ({ req, params: { result } }) => {
	// if (result === 'success' && req?.query?.session_id) {
		const session = await stripe.checkout.sessions.retrieve(req.query.session_id)
		const customer = await stripe.customers.retrieve(session.customer)
		return {
			props: {
				session,
				customer
			}
		}
	// }
	// return {
	// 	redirect: {
	// 		permanent: false,
	// 		destination: "/"
	// 	}
	// }
}

export default PaymentPage