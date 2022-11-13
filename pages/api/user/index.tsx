import { Settings } from '@/utils/settings'
import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

type statistics = {
	userData,
	subscription,
	generatedQuotes?: number,
	tweetedQuotes?: number,
	status?: number
}

const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
	
		const data: statistics = {
			userData: null,
			subscription: null,
			generatedQuotes: 0,
			tweetedQuotes: 0,
			status: 0
		}

		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()
		const { action, page=1, number=10 } = req?.query

		let _page = parseInt(page as string, 10)
		let _size = parseInt(number as string, 10)
	
		const limit = _size ? _size : 10
		const from = _page ? _page * limit : 0
		const to = _page ? from + _size - 1 : _size - 1	
		
		
		if (user?.id) {
			// Check only if the user allowed Auto-Post tweets/Quotes
			if (action === 'checkAutoPost') {
				const { data: _autoPostStatus } = await supabase
					.from('users')
					.select('metadata')
					.eq('id', user?.id)
					.single()
				
				return res.status(200).json(_autoPostStatus?.metadata?.auto_post ?? false)
			}
			
			// Check only if the user has a valid subscription
			else if (action === 'checkUserSubscription') {
				const { data: _isSubscribed } = await supabase
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
				const { data: _isTwitterLinked } = await supabase
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
			else if (action === 'getTweets') {
				const { data: lastTweets, count: tweets_count } = await supabase
					.from('quotes')
					.select('*', { count: 'exact' })
					.eq('user_id', user?.id)
					// .eq('tweet_metadata->>status', 'publish')
					.order('id', { ascending: false })
					.range(from, to)

				const { data: _isTwitterLinked } = await supabase
					.from('tokens')
					.select('access_token, access_secret')
					.eq('user_id', user?.id)
					.not('access_token', 'is', null)
					.not('access_secret', 'is', null)
					.single()

				return res.status(200).json({ tweets: lastTweets, count: tweets_count, page: _page+1, isTwitterLinked: _isTwitterLinked?.access_token && _isTwitterLinked?.access_secret ? true : false })
			}

			// Get user data
			else if (action === 'getUserData') {
				const { count: quotes } = await supabase
					.from('quotes')
					.select('*', { count: 'exact', head: true })
					.eq('user_id', user?.id)

				const { count: tweetedQuotes, error } = await supabase
					.from('quotes')
					.select('tweet_metadata', { count: 'exact', head: true })
					.eq('user_id', user?.id)
					.eq('tweet_metadata->>status', 'publish')

				const { data: subscription } = await supabase
					.from('subscriptions')
					.select('*')
					.eq('is_subscribed', true)
					.single()

				const { data: userData } = await supabase
					.from('users')
					.select('*')
					.single()
				
				data.userData = userData ?? null
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
}

export default ProtectedRoute