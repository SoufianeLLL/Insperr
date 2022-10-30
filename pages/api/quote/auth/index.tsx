import { NextApiRequest } from 'next'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'

export const config = { runtime: 'experimental-edge' }


export default withApiAuth(async function handler(req: NextApiRequest, res, supabaseServerClient) {

	const { data: { user } } = await supabaseServerClient.auth.getUser()
	const { action, number=10, page } = req?.query

	let result
	let _page = parseInt(page as string, 10)
	let _size = parseInt(number as string, 10)

	const limit = _size ? +_size : 10
	const from = _page ? _page * limit : 0
	const to = _page ? from + _size - 1 : _size - 1


	if (action) {
		switch (action) {
			case 'getPublicQuotes':
				// get lastest quotes from Supabase
				const { data: publicQuotes, count: p_count } = await supabaseServerClient
					.from('public_quotes')
					.select('*', { count: 'exact' })
					.order('id', { ascending: false })
					.range(from, to)
	
				result = { quotes: publicQuotes, p_count, page: to }
				break;
	
			case 'getQuotes':
				// get lastest quotes from Supabase
				const { data: latestQuotes, count: l_count } = await supabaseServerClient
					.from('quotes')
					.select('*, users(fullname, username)', { count: 'exact' })
					.eq('user_id', user?.id)
					.order('id', { ascending: false })
					.range(from, to)
	
				result = { quotes: latestQuotes, l_count, page: to }
				break;
		}
	}
	else {
		return new Response(JSON.stringify({
			status: 401,
			message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
		}), { status: 401 })
	}

	return new Response(JSON.stringify(result), { status: 200 })
})