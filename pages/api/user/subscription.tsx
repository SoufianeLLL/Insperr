import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'GET') {
	
		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()

		if (user?.id) {
			const { data: subscription, error } = await supabase
				.from('subscriptions')
				.select()
				.eq('user_id', user?.id)
				.eq('is_subscribed', true)
				.single()

			if (!error) {
				return res.status(200).json(subscription)
			}
		}
		else {
			return res.status(200).end()
		}

		return res.status(200).json(null)
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).end({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}

export default ProtectedRoute