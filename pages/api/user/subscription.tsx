import { useSessionContext } from "@supabase/auth-helpers-react"


const UsersGet = async (req, res) => {
	if (req.method === 'GET') {

		const { supabaseClient } = useSessionContext()
		const { data: { user } } = await supabaseClient.auth.getUser(req.cookies["sb-access-token"])

		if (user?.id) {
			const { data: subscription, error } = await supabaseClient
				.from('subscription')
				.select()
				.eq('user_id', user?.id)

			if (!error) {
				return res.status(200).json(subscription)
			}
		}
		else {
			return res.status(401).end('Unauthorized')
		}

		return res.status(200).json()
	}
	else {
		res.setHeader('Allow', 'GET')
		return res.status(405).end({
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}

export default UsersGet