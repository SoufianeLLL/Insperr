import { withApiAuth } from '@supabase/auth-helpers-nextjs'


export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	
	const { data: { user } } = await supabaseServerClient.auth.getUser()

	const { result_id } = req?.query

    // get Quote result by ID
    if (result_id) {
        const { data: result, error } = await supabaseServerClient
            .from('quotes')
            .select('*, quotes_satisfaction(satisfaction)')
            .eq('result_id', result_id)
            .eq('user_id', user?.id)
            .single()
    
        if (!error) {
            return res.status(200).json(result)
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
})