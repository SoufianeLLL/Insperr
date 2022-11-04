import supabaseAdmin from "@/utils/supabase-admin"


export default async function handler(req, res) {

	const { action, number=10, page=null, user_id=null } = req?.query

	let result
	let _page = parseInt(page as string, 10)
	let _size = parseInt(number as string, 10)

	const limit = _size ? +_size : 10
	const from = _page ? _page * limit : 0
	const to = _page ? from + _size - 1 : _size - 1


	if (action) {
		switch (action) {
			case 'getRandomCustomQuotes':
				// get random quotes from Supabase
				const { data: randomQuotes } = await supabaseAdmin
					.from('random_quotes')
					.select('*')
					.limit(+(number) ?? 12)
	
				result = randomQuotes
				break;
			
			case 'getUserCustomQuotes':
				// get random quotes from Supabase
				const { data: userQuotes, count } = await supabaseAdmin
					.from('quotes')
					.select('*, users(username, fullname, avatar, is_verified)')
					.eq('user_id', user_id)
					.order('id', { ascending: false })
					.limit(+(number) ?? 12)
					.range(from, to)
	
				result = { quotes: userQuotes, count, page: to }
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