import { NextApiHandler } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Settings } from '@/utils/settings'
import { dateFormat } from '@/lib/validation'


const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)


const ProtectedRoute: NextApiHandler = async (req, res) => {

	const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
	const { data: { session } } = await supabase.auth.getSession() // Check if we have a session
	const { phrase, category, characters, quota=1 } = req?.body

	if (!session)
		return res.status(401).json({
			status: 401,
			error: 'not_authenticated',
			message: 'The user does not have an active session or is not authenticated',
		})

	let resultIds = []

	if (phrase && phrase?.length >= 6 && category && characters && session?.user) {
		// Check user subscription and quota
		const { data: subscription, error } = await supabase
			.from('subscriptions')
			.select('is_subscribed, product_id')

		if (!error) {
			// check the user's quota
			var xd = new Date(); xd.setDate(1); xd.setHours(-1);
			const check_quota = subscription?.length === 0 ? Settings?.products.find((itm) => { return 'free' === itm.id }) 
				: Settings?.products.find((itm) => { return subscription[0]?.product_id === itm.id })
			
			const { count } = await supabase
				.from('quotes')
				.select('*', { count: 'exact', head: true })
				.eq('user_id', session?.user?.id)
				.eq('type', 'custom')
				.gt('created_at', dateFormat(xd, true))
			
			// If the user's quotes allowed is less than the stored in the database in the last month
			if (check_quota?.quotes > count) {
				for (let g=0; g < quota; g++) {
					// OpenAi generate/clone new Quote
					try {
						let result = await openai.createCompletion({
							model: "text-davinci-002",
							prompt: `Generate a new quote from scratch about ${category} contains the prompt '${phrase}'`,
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
							const { data: { result_id } } = await supabase
								.from('quotes')
								.insert({
									content: correction,
									user_id: session?.user?.id,
									type: 'custom',
									topics: category,
									keyword: phrase
								})
								.select('result_id')
								.single()
							
							resultIds.push(result_id)
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
				if (resultIds?.length > 0) {
					return res.status(200).json({resultIds})
				}
			}
			else {
				return res.status(200).json({
					status: 200,
					message: 'The request has not been completed because your account has reached 100% of your quota.'
				})
			}
		}
		else {
			return res.status(200).json({
				status: 200,
				message: 'The request has not been completed because you don\'t have a valid subscription.'
			})
		}
	}

	return res.status(401).json({
		status: 401,
		message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
	})
}

export default ProtectedRoute