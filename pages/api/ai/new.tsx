import { Configuration, OpenAIApi } from 'openai'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'
import { Settings } from '@/utils/settings'
import { dateFormat } from '@/lib/validation'

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)


export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	
	const { data: { user } } = await supabaseServerClient.auth.getUser()

	const { phrase, category, quota=1, characters } = req?.body

	let resultIDs = []

	if (phrase && phrase?.length >= 6 && category && characters && user && quota) {
		// Check user subscription and quota
		const { data: subscription, error } = await supabaseServerClient
			.from('subscriptions')
			.select('is_subscribed, product_id')
			.single()

		if (!error && subscription) {
			// check the user's quota
			var xd = new Date(); xd.setDate(1); xd.setHours(-1);
			const check_quota = Settings?.products.find((itm) => { return subscription?.product_id === itm.id })
			const { count } = await supabaseServerClient
				.from('quotes')
				.select('*', { count: 'exact', head: true })
				.eq('user_id', user?.id)
				.eq('type', 'custom')
				.gt('created_at', dateFormat(xd, true))
			
			// If the user's quotes allowed is less than the stored in the database in the last month
			if (check_quota?.quotes > count) {
				// OpenAi generate new Quotes
				for (let i=0; (i < quota && i < Settings?.quote?.max_quota); i++) {
					try {
						const result = await openai.createCompletion({
							model: "text-davinci-002",
							prompt: `Generate a new quote from scratch about ${category} starting with the prompt '${phrase}'`,
							temperature: 0.8,
							max_tokens: parseInt(characters) <= Settings?.quote?.max_characters ? parseInt(characters) : Settings?.quote?.max_characters,
							top_p: 1,
							frequency_penalty: 1,
							presence_penalty: 1,
						})

						const response = result?.data?.choices[0]?.text ?? null
						// Insert output into database
						if (response) {
							const correction = response?.replace(/\r?\n|\r/gi, '')
							const { data: { result_id } } = await supabaseServerClient
								.from('quotes')
								.insert({
									content: correction,
									user_id: user?.id,
									type: 'custom',
									topics: category,
									tweeted: false,
									keyword: phrase
								})
								.select('result_id')
								.single()
							
							resultIDs.push(result_id)
						}
					}
					catch (error) {
						if (error.response) {
							return res.status(400).json({
								status: error?.response?.status,
								message: error?.response?.data
							})
						}
						else {
							return res.status(400).json({
								status: 400,
								message: error?.message
							})
						}
					}
				}
				if (resultIDs) {
					return res.status(200).json({resultIDs})
				}
			}
			else {
				return res.status(401).json({
					status: 401,
					message: 'Unauthorized, the request has not been completed because your account has reached 100% of your quota.'
				})
			}
		}
		else {
			return res.status(401).json({
				status: 401,
				message: 'Unauthorized, the request has not been completed because you don\'t have a valid subscription.'
			})
		}
	}

	return res.status(401).json({
		status: 401,
		message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
	})
})