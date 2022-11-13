import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const ProtectedRoute: NextApiHandler = async (req, res) => {

	const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
	const { data: { user } } = await supabase.auth.getUser()
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
				const { data: publicQuotes, count: p_count } = await supabase
					.from('public_quotes')
					.select('*', { count: 'exact' })
					.order('id', { ascending: false })
					.range(from, to)
	
				result = { quotes: publicQuotes, count: p_count, page: _page+1 }
				break;
	
			case 'getQuotes':
				// get lastest quotes from Supabase
				const { data: latestQuotes, count: l_count } = await supabase
					.from('quotes')
					.select('*, users(fullname, username, avatar, is_verified)', { count: 'exact' })
					.eq('user_id', user?.id)
					.order('id', { ascending: false })
					.range(from, to)
	
				result = { quotes: latestQuotes, count: l_count, page: _page+1 }
				break;
		}
	}
	else {
		res.status(401).json({
			status: 401,
			message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
		})
	}

	res.status(200).json(result)
}

export default ProtectedRoute