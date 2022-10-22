import supabaseAdmin from "@/lib/api/supabase-admin"
import { supabaseClient } from "@supabase/auth-helpers-nextjs"


const UsersGet = async (req, res) => {
	if (req.method === 'POST') {

        const { user } = await supabaseClient.auth.api.getUserByCookie(req)
		const { action, params } = req.body

		if (action === 'changeUsername') {
			if (user?.id && params?.username && params?.user_metadata) {
				const { error } = await supabaseClient
					.from('users')
					.update({ username: params?.username })
					.eq('id', user?.id)
	
				if (!error) {
					await supabaseAdmin.auth.api.updateUserById(
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
				const { error } = await supabaseClient
					.from('users')
					.update({ email: params?.email })
					.eq('id', user?.id)
	
				if (!error) {
					await supabaseAdmin.auth.api.updateUserById(
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
}

export default UsersGet