import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const ProtectedRoute: NextApiHandler = async (req, res) => {
	
	const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
	const { data: { session } } = await supabase.auth.getSession() // Check if we have a session
	const { result_ids } = req?.query

	const IDs = (result_ids)?.toLocaleString()?.split(',') ?? null

	if (!session)
		return res.status(401).json({
			status: 401,
			error: 'not_authenticated',
			message: 'The user does not have an active session or is not authenticated',
		})

	// Run queries with RLS on the server
	// get Quote result by ID
	if (IDs?.length > 0) {
		const { data: result, error } = await supabase
			.from('quotes')
			.select('*, quotes_satisfaction(satisfaction)')
			.eq('user_id', session?.user?.id)
			.in('result_id', IDs)
	
		if (!error) {
			return res.status(200).json({
				status: 200,
				result,
				session
			})
		}
		else {
			return res?.status(404).json({
				status: 404, 
				error
			})
		}
	}

	return res.status(401).json({
		status: 401,
		message: 'Unauthorized, the request has not been completed because it lacks valid authentication credentials for the requested resource.'
	})
  
}

export default ProtectedRoute