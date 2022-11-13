import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { twitterUserClientByToken, twitterUserClientForUserId } from '@/utils/twitter-client'


const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {

		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()
		const client = user ? await twitterUserClientForUserId(user?.id) : await twitterUserClientByToken(req, res) // Get twitter client by user id/token

		let _tweetID
		const { quote_id, action } = req?.query

		if (user?.id && quote_id && action) {
			const { data: quote } = await supabase
				.from('quotes')
				.select('content, user_id, tweet_metadata')
				.eq('id', quote_id)
				.eq('user_id', user?.id)
				.single()

			if (quote && client) {
				try {
					// Retweet with Twitter API
					if (action === 'retweet') {
						await client.v2.retweet(
							user?.user_metadata?.provider_id, // Twitter account ID
							quote_id?.toLocaleString() // Quote or Tweet ID
						)
					}
					// Tweet with Twitter API
					else if (action === 'tweet') {
						const { data: createdTweet } = await client.v2.tweet(quote?.content)
						if (createdTweet) {
							_tweetID = createdTweet?.id
						}
					}
				}
				catch (e) {
					return res.status(500).json({
						code: 500,
						error: 'ERROR_OCCURRED',
						message: 'An error occurred, please try again or contact us.'
					})
				}

				// Add new retweet count
				const _retweets = parseInt(quote?.tweet_metadata?.retweets as string, 10)
				const _tweets   = parseInt(quote?.tweet_metadata?.tweets as string, 10)
				const { error } = await supabase
					.from('quotes')
					.update({
						tweet_metadata: {
							... quote?.tweet_metadata, 
							retweets: action === 'retweet' ? _retweets+1 : _retweets,
							tweets: action === 'tweet' ? _tweets+1 : _tweets,
							status: (user?.id == quote?.user_id && !quote?.tweet_metadata?.status) ? 'publish' : quote?.tweet_metadata?.status,
							tweet_id: (user?.id == quote?.user_id && !quote?.tweet_metadata?.tweet_id && _tweetID) ? _tweetID : quote?.tweet_metadata?.tweet_id,
							twitted_at: (user?.id == quote?.user_id && !quote?.tweet_metadata?.twitted_at) ? ((new Date()).toISOString()).toLocaleString() : quote?.tweet_metadata?.twitted_at
						},
						updated_at: ((new Date()).toISOString()).toLocaleString()
					})
					.eq('id', quote_id)
					.eq('user_id', user?.id)
				
				if (!error) return res.status(200).json({ error: false })
			}
		}

		return res.status(500).json({
			code: 500,
			error: 'ERROR_OCCURRED',
			message: 'An error occurred, please try again or contact us.'
		})
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			code: 405,
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}

export default ProtectedRoute