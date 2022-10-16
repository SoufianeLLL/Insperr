import { withApiAuth, supabaseServerClient } from '@supabase/auth-helpers-nextjs'
import { dateFormat } from '@/lib/validation'

type analytics = {
	returningRequests?: number,
	newRequests?: number,
	status?: number
}

export default withApiAuth(
	async function ProtectedRoute ( req, res ) {
		const query = req?.query
	    let data: analytics = {
			returningRequests: 0,
			newRequests: 0,
			status: 0
		}

	    if (query?.user_id) {
			let x = new Date(), yFormat = dateFormat(new Date(x.getFullYear(), x.getMonth()-1, x.getMonth()))
			let newRequests = 0, returningRequests = 0

			const { data: newReq } = await supabaseServerClient({ req, res })
	            .from('requests')
				.select('count')
	            .eq('user_id', query?.user_id)
	            .eq('type', 'new')
				.gt('created_at', yFormat)

			for (let i = newReq?.length; i--;) {
				newRequests += newReq[i]?.count
			}

			const { data: returningReq } = await supabaseServerClient({ req, res })
	            .from('requests')
				.select('count')
	            .eq('user_id', query?.user_id)
	            .eq('type', 'returning')
				.gt('created_at', yFormat)

			for (let i = returningReq?.length; i--;) {
				returningRequests += returningReq[i]?.count
			}

			data.returningRequests = returningRequests
			data.newRequests = newRequests
			data.status = 200
	    }

	    return res.status(200).json(data)
	}
)
