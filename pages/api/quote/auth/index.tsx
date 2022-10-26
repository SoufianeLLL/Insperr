import { withApiAuth } from '@supabase/auth-helpers-nextjs'


export default withApiAuth(async function handler(req, res, supabaseServerClient) {

	const { data: { user } } = await supabaseServerClient.auth.getUser()
	
	const { action, number=10 } = req?.query
	let quotes

	
	if (action) {
		switch (action) {
			case 'getQuotes':
				// get lastest quotes from Supabase
				const { data: latest } = await supabaseServerClient
					.from('quotes')
					.select('*')
					.eq('user_id', user?.id)
	
				quotes = latest
				break;
	
			case 'getRandomQuotes':
				// get random quotes from Supabase
				const { data: random } = await supabaseServerClient
					.from('random_quotes')
					.select('*')
					.limit(+number ?? 10)
	
				quotes = random
				break;
		}
	}
	else {
		return res.status(401).json({
			status: 401,
			message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
		})
	}

	return res.status(200).json(quotes)
})