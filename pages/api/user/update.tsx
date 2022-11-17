import { NextApiHandler } from 'next'
import supabaseAdmin from '@/utils/supabase-admin'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {
	
		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()
		const { action, params } = req.body

		if (action === 'changeUsername') {
			if (user?.id && params?.username && params?.user_metadata) {
				const { error } = await supabase
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
	
		else if (action === 'changeAvatar') {
			if (user?.id && params?.avatar && params?.user_metadata) {
				const { error } = await supabase
					.from('users')
					.update({ avatar: params?.avatar })
					.eq('id', user?.id)
				
				if (!error) {
					await supabaseAdmin.auth.admin.updateUserById(
						user?.id, { user_metadata: { ...params?.user_metadata, avatar_url: params?.avatar } }
					)
					return res.status(200).json({ 
						error: null,
						message: null
					})
				}
			}
		}
	
		else if (action === 'changeFullname') {
			if (user?.id && params?.fullname) {
				const { error } = await supabase
					.from('users')
					.update({ fullname: params?.fullname })
					.eq('id', user?.id)
	
				if (!error) {
					await supabaseAdmin.auth.admin.updateUserById(
						user?.id, { user_metadata: { ...params?.user_metadata, fullname: params?.fullname } }
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
				const { error } = await supabase
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
			message: 'You not allowed to update your data',
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

export default ProtectedRoute