import { withApiAuth } from "@supabase/auth-helpers-nextjs"
import supabaseAdmin from "@/utils/supabase-admin"


export default withApiAuth(async function handler(req, res, supabaseServerClient) {
	if (req.method === 'POST') {

		const { data: { user } } = await supabaseServerClient.auth.getUser()
		const { action, params } = req.body

		if (action === 'changeUsername') {
			if (user?.id && params?.username && params?.user_metadata) {
				const { error } = await supabaseServerClient
					.from('users')
					.update({ username: params?.username })
					.eq('id', user?.id)
	
				if (!error) {
					await supabaseAdmin.auth.admin.updateUserById(
						user?.id, { user_metadata: { ...params?.user_metadata, username: params?.username } }
					)
					return res.status(200).json({ 
						error: null,
						message: null
					})
				}
			}
		}
	
		else if (action === 'changeEmail') {
			if (user?.id && params?.email) {
				const { error } = await supabaseServerClient
					.from('users')
					.update({ email: params?.email })
					.eq('id', user?.id)
	
				if (!error) {
					await supabaseAdmin.auth.admin.updateUserById(
						user?.id, { email: params?.email }
					)
					return res.status(200).json({ 
						error: null,
						message: null
					})
				}
			}
		}
		else {
            return res.status(401).end('Unauthorized')
        }

		return res.status(401).json({ 
			error: 'NOT_ALLOWED',
			message: 'You not allowed to update your username',
		})
	}
	else {
		res.setHeader('Allow', 'POST')
		return res.status(405).end({
            error: 'NOT_ALLOWED',
            message: 'Method Not Allowed'
        })
	}
})