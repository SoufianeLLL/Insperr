import { Settings } from '@/utils/settings'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'


type statistics = {
	subscription,
	generatedQuotes?: number,
	tweetedQuotes?: number,
	status?: number
}

export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	if (req.method === 'GET') {

		const data: statistics = {
			subscription: null,
			generatedQuotes: 0,
			tweetedQuotes: 0,
			status: 0
		}

		const { action } = req?.query
		const { data: { user } } = await supabaseServerClient.auth.getUser()

		
		if (user?.id) {
			// Check only if the user allowed Auto-Post tweets/Quotes
			if (action === 'checkAutoPost') {
				const { data: result } = await supabaseServerClient
					.from("users")
					.select("metadata")
					.eq('id', user?.id)
					.single()
				
				return res.status(200).json(result?.metadata?.auto_post ?? false)
			}
			
			// Check only if the user has a valid subscription
			else if (action === 'checkUserSubscription') {
				const { data: subscription } = await supabaseServerClient
					.from("subscription")
					.select('product_id')
					.eq('id', user?.id)
					.eq('is_subscribed', true)
					.single()
				
				// Check if the subscribed user allowed to connect to twitter 
				const checkIfAllowed = Settings?.products?.some((o) => {return ((o['id'] === subscription?.product_id) && o['autoPost'] === true)})
				return res.status(200).json(subscription ? (checkIfAllowed ?? false) : false)
			}
			
			// Get user data
			else if (action === 'getUserData') {
				const { count: quotes } = await supabaseServerClient
					.from('quotes')
					.select('*', { count: 'exact', head: true })
					.eq('user_id', user?.id)

				const { count: tweetedQuotes } = await supabaseServerClient
					.from('quotes')
					.select('*', { count: 'exact', head: true })
					.eq('user_id', user?.id)
					.eq('tweeted', true)

				const { data: subscription } = await supabaseServerClient
					.from('subscriptions')
					.select('*')
					.eq('is_subscribed', true)
					.single()
				
				data.subscription = subscription ?? null
				data.generatedQuotes = quotes ?? 0
				data.tweetedQuotes = tweetedQuotes ?? 0
				data.status = 200

				return res.status(200).json(data)
			}
		}

		return res.status(401).json('Unauthorized')
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
})