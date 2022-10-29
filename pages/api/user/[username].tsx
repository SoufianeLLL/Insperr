import supabaseAdmin from '@/utils/supabase-admin'
import { withApiAuth } from '@supabase/auth-helpers-nextjs'


export default withApiAuth(async function handler(req, res) {
	if (req.method === 'GET') {

		const { username } = req?.query
		
		if (username) {
			// Get user by ID
			const { data: result } = await supabaseAdmin
				.from('users')
				.select()
				.eq('username', username)
				.single()
			
			return res.status(200).json(result)
		}

		return res.status(401).json('Unauthorized')
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).json({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
})