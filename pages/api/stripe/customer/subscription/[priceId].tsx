import { withApiAuth } from "@supabase/auth-helpers-nextjs"
import stripe from "@/utils/stripejs"


export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	if (req.method === 'GET') {

		const { data: { user } } = await supabaseServerClient.auth.getUser()
		const { priceId } = req.query

		let session

		if (user?.id && priceId) {
			const { data: { stripe_customer_id }, error } = await supabaseServerClient
				.from('users')
				.select('stripe_customer_id')
				.single()
			
			// set up Stripe session checkout
			if (stripe_customer_id) {
				session = await stripe.checkout.sessions.create({
					customer: stripe_customer_id?.toString(),
					mode: "subscription",
					payment_method_types: ["card"],
					line_items: [{
						price: priceId,
						quantity: 1
					}],
					success_url: `${process.env.NEXT_PRUBLIC_URL_HOME}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${process.env.NEXT_PRUBLIC_URL_HOME}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
				})
			}

			if (!error && session) {
				return res.status(200).json({
					id: session.id ?? null
				})
			}
		}
		else {
			return res.status(401).json('Unauthorized')
		}

		return res.status(200).json({
			error: 'ERROR_OCCURRED',
			message: 'An error occurred, please try again or contact us.'
		})
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
})