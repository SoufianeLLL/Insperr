import { supabaseClient } from "@supabase/auth-helpers-nextjs"


const UsersGet = async (req, res) => {
	if (req.method === 'GET') {

        const { user } = await supabaseClient.auth.api.getUserByCookie(req)

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