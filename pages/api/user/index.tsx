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
				const { data: _autoPostStatus } = await supabaseServerClient
					.from('users')
					.select('metadata')
					.eq('id', user?.id)
					.single()
				
				return res.status(200).json(_autoPostStatus?.metadata?.auto_post ?? false)
			}
			
			// Check only if the user has a valid subscription
			else if (action === 'checkUserSubscription') {
				const { data: _isSubscribed } = await supabaseServerClient
					.from('subscriptions')
					.select('product_id')
					.eq('user_id', user?.id)
					.eq('is_subscribed', true)
					.single()
				
				// Check if the subscribed user allowed to connect to twitter 
				const checkIfAllowed = Settings?.products?.some((o) => {return ((o['id'] === _isSubscribed?.product_id) && o['autoPost'] === true)})
				return res.status(200).json(_isSubscribed ? (checkIfAllowed ?? false) : false)
			}
			
			// Check only if the user has linked their Twitter account
			else if (action === 'checkTwitterLinking') {
				const { data: _isTwitterLinked } = await supabaseServerClient
					.from('tokens')
					.select('access_token, access_secret')
					.eq('user_id', user?.id)
					.not('access_token', 'is', null)
					.not('access_secret', 'is', null)
					.single()

				// Check if the subscribed user allowed to connect to twitter 
				return res.status(200).json(_isTwitterLinked?.access_token && _isTwitterLinked?.access_secret ? true : false)
			}
			
			// Get user's twitter data
			else if (action === 'getTwitterData') {
				const { data: lastTweets } = await supabaseServerClient
					.from('quotes')
					.select('content, place, keyword, result_id, tweet_metadata')
					.eq('user_id', user?.id)
					.eq('tweet_metadata->>status', 'publish')
					.limit(5)

				const { data: _isTwitterLinked } = await supabaseServerClient
					.from('tokens')
					.select('access_token, access_secret')
					.eq('user_id', user?.id)
					.not('access_token', 'is', null)
					.not('access_secret', 'is', null)
					.single()

				return res.status(200).json({ lastTweets, isTwitterLinked: _isTwitterLinked?.access_token && _isTwitterLinked?.access_secret ? true : false })
			}

			// Get user data
			else if (action === 'getUserData') {
				const { count: quotes } = await supabaseServerClient
					.from('quotes')
					.select('*', { count: 'exact', head: true })
					.eq('user_id', user?.id)

				const { count: tweetedQuotes, error } = await supabaseServerClient
					.from('quotes')
					.select('tweet_metadata', { count: 'exact', head: true })
					.eq('user_id', user?.id)
					.eq('tweet_metadata->>status', 'publish')

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