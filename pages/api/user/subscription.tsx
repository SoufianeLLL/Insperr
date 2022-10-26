import { withApiAuth } from "@supabase/auth-helpers-nextjs"


export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	if (req.method === 'GET') {

		const { data: { user } } = await supabaseServerClient.auth.getUser()

		if (user?.id) {
			const { data: subscription, error } = await supabaseServerClient
				.from('subscriptions')
				.select()
				.eq('user_id', user?.id)
				.eq('is_subscribed', true)
				.single()

			if (!error) {
				return res.status(200).json(subscription)
			}
		}
		else {
			return res.status(401).end('Unauthorized')
		}

		return res.status(200).json(null)
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).end({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
})