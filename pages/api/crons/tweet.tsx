import supabaseAdmin from "@/utils/supabase-admin"
import { twitterUserClientByToken, twitterUserClientForUserId } from "@/utils/twitter-client"



export default async function handler(req, res) {
	if (req.query.API_SECRET_KEY !== process.env.API_SECRET_KEY) {
		return res.status(401).send("You are not authorized to call this API");
	}

	try {
		// Get all subscribed users with valid subscription and with AutoPost ON
		const { data: users } = await supabaseAdmin
			.from('subscriptions')
			.select('user:users(*)')
			.eq('users.metadata->auto_post', true)
			.eq('is_subscribed', true)

		if (users && users?.length > 0) {
			for (let i = 0; i < users.length; i++) {
				const list = users[i];
				if (list?.user) {
					// get all untweeted quotes for subscribed users who turned the AutoPost ON
					const { data: Quotes, error } = await supabaseAdmin
						.from('quotes')
						.select('id, content, tweet_metadata')
						.eq('user_id', list?.user?.id)
						.eq('tweet_metadata->>status', null)
						.limit(100)
						.order('id', { ascending: true })
					
					if (Quotes && Quotes?.length > 0) {
						for (let q = 0; q < Quotes.length; q++) {
							const quote = Quotes[q]
							// AutoPost quote to Twitter
							let client = list?.user ? await twitterUserClientForUserId(list?.user?.id) : await twitterUserClientByToken(req, res)
							if (!client) {
								await supabaseAdmin
									.from('logs')
									.insert({
										log: {
											operation: 'cronJob',
											status: 500,
											message: `Faild fetching client from user_id: ${list?.user?.id}`,
										}
									})
								return res.status(500).end()
							}
							const { data: createdTweet } = await client.v2.tweet(quote?.content)
							if (createdTweet) {
								// Update quote status
								await supabaseAdmin
									.from('quotes')
									.update({
										tweet_metadata: {
											...quote?.tweet_metadata, 
											status: 'publish',
											tweet_id: createdTweet.id ?? null,
											twitted_at: ((new Date()).toISOString()).toLocaleString(),
											tweets: 1
										}
									})
									.eq('id', quote?.id)
							}
						}
					}
				}
			}
		}
	}
	catch (e) {
		await supabaseAdmin
			.from('logs')
			.insert({
				log: { status: 500, error: e }
			})

		return res.status(500).end()
	}

	return res.send({ message: `Quotess has been tweeted successfully.` })
}