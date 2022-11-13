import { NextApiHandler } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const ProtectedRoute: NextApiHandler = async (req, res) => {
	if (req.method === 'POST') {

		const supabase = createServerSupabaseClient({ req, res }) // Create authenticated Supabase Client
		const { data: { user } } = await supabase.auth.getUser()
		const { quote_id, quote_content } = req?.body

		if (user?.id && quote_id && quote_content) {
            const { error } = await supabase
                .from('quotes')
                .update({
                    content: quote_content,
                    updated_at: ((new Date()).toISOString()).toLocaleString()
                })
                .eq('id', quote_id)
                .eq('user_id', user?.id)

            console.log(error)

            if (!error) return res.status(200).json({ errro: false })
		}

		return res.status(500).json({
            code: 500,
			error: 'ERROR_OCCURRED',
			message: 'An error occurred, please try again or contact us.'
		})
	}
	else {
		res.setHeader('Allow', 'POST')
		return res.status(405).json({
            code: 405,
			error: 'NOT_ALLOWED',
			message: 'Method Not Allowed'
		})
	}
}

export default ProtectedRoute