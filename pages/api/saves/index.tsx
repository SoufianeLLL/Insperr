import { supabaseServerClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
	
	const query = req?.body
    let saves


	switch (query?.action) {
		case 'Read':
			if (query?.user_id) {
				const { data } = await supabaseServerClient({ req, res })
					.from("saves")
					.select('*')
					.eq('user_id', query?.user_id)
					
				saves = data
			}
			break;
		

		case 'Insert':
			if (query?.user_id && query?.quote_id) {
				// check if the user already saved the Quote
				const { count } = await supabaseServerClient({ req, res })
					.from("saves")
					.select('*', { count: 'exact', head: true })
					.eq('user_id', query?.user_id)
					.eq('quote_id', query?.quote_id)

				if (!count) {
					// Save the new Quote
					await supabaseServerClient({ req, res })
						.from('saves')
						.insert({
							user_id: query?.user_id,
							quote_id: query?.quote_id
						})
				}

				return res.status(200).json({
					status: count ? 'error' : 'success',
					message: count ? 'Quote already saved.' : 'Quote added successfully to your bookmark.'
				})
			}
			break;
	}

	return res.status(200).json(saves)
}