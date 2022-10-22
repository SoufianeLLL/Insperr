import { supabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req, res) {
	if (req.method === 'GET') {

		const { user } = await supabaseClient.auth.api.getUserByCookie(req)
		const { action, quote_id } = req?.query


		if (user?.id && action) {
			switch (action) {
				case 'Read':
					if (user?.id) {
						const { data: _saves, error } = await supabaseClient
							.from('saves')
							.select('quotes(id, content, type), users(fullname, username)')
							.eq('user_id', user?.id)
						
						const saves = _saves ? _saves?.map((quote) => {
							return {
								id: quote?.quotes?.id,
								type: quote?.quotes?.type,
								content: quote?.quotes?.content,
								fullname: quote?.users?.fullname,
								username: quote?.users?.username
							}
						}) : null

						console.log(error)
						console.log(saves)
						return res.status(200).json(saves)
					}
					break;
				
				
				case 'Delete':
					if (user?.id && quote_id) {
						// check if the user already saved the Quote then delete it
						const { count } = await supabaseClient
							.from('saves')
							.select('*', { count: 'exact', head: true })
							.eq('user_id', user?.id)
							.eq('quote_id', quote_id)

						if (count) {
							// Save the new Quote
							await supabaseClient
								.from('saves')
								.delete()
								.eq('user_id', user?.id)
								.eq('quote_id', quote_id)
						}

						return res.status(200).json({
							status: !count ? 'error' : 'success',
							message: !count ? 'You can\'t delete this quotes from your bookmarks!' : 'Quote deleted successfully from your bookmarks.'
						})
					}
					break;
				
				
				case 'Insert':
					if (user?.id && quote_id) {
						// check if the user already saved the Quote
						const { count } = await supabaseClient
							.from('saves')
							.select('*', { count: 'exact', head: true })
							.eq('user_id', user?.id)
							.eq('quote_id', quote_id)

						if (!count) {
							// Save the new Quote
							await supabaseClient
								.from('saves')
								.insert({
									user_id: user?.id,
									quote_id: quote_id
								})
						}

						return res.status(200).json({
							status: count ? 'error' : 'success',
							message: count ? 'Quote already saved.' : 'Quote added successfully to your bookmarks.'
						})
					}
					break;
			}
		}
		else {
			return res.status(401).json('Unauthorized')
		}

		return res.status(200).json({
			error: 'ERROR_OCCURRED',
			message: 'An error occurred, please try again or contact us.'
		})
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}