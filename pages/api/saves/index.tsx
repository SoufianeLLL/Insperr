import { supabaseServerClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
	
	const body = req?.body
	const query = req?.query
    let saves


	switch (query?.action) {
		case 'Read':
			if (query?.user_id) {
				const { data: result } = await supabaseServerClient({ req, res })
					.from("saves")
					.select('quotes(id, content), users(fullname, username)')
					.eq('user_id', query?.user_id)
					
				saves = result
			}
			break;
		

		case 'Insert':
			if (body?.user_id && body?.quote_id) {
				// check if the user already saved the Quote
				const { count } = await supabaseServerClient({ req, res })
					.from("saves")
					.select('*', { count: 'exact', head: true })
					.eq('user_id', body?.user_id)
					.eq('quote_id', body?.quote_id)

				console.log(body?.user_id)
				console.log(body?.quote_id)

				if (!count) {
					// Save the new Quote
					await supabaseServerClient({ req, res })
						.from('saves')
						.insert({
							user_id: body?.user_id,
							quote_id: body?.quote_id
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