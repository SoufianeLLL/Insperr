import stripe from "@/utils/stripejs"
import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {

		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()
		let session

		if (user?.id) {
			const { data: { stripe_customer_id }, error } = await supabase
				.from('users')
				.select('stripe_customer_id')
				.single()
			
			// set up Stripe session checkout
			if (stripe_customer_id) {
				session = await stripe.billingPortal.sessions.create({
					customer: stripe_customer_id?.toString(),
					return_url: `${process.env.NEXT_PUBLIC_URL_HOME}/dashboard/user/account`
				})
			}

			if (!error && session) {
				return res.status(200).json({
					url: session?.url ?? null
				})
			}
		}

		return res.status(200).json({
			error: 'Unauthorized',
            message: 'An error occured when loading Stripe Portal.'
		})
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}

export default ProtectedRoute