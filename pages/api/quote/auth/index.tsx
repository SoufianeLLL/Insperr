import { withApiAuth } from '@supabase/auth-helpers-nextjs'


export default withApiAuth(async function handler(req, res, supabaseServerClient) {

	const { data: { user } } = await supabaseServerClient.auth.getUser()
	
	const { action } = req?.query
	let quotes

	switch (action) {
		case 'getRandomQuotes':
			// get random custom quotes from Supabase (supabase.io)
            const { data: result } = await supabaseServerClient
                .from('random_quotes')
                .select('*')

            quotes = result
			break;
	}

	return res.status(200).json(quotes)
})