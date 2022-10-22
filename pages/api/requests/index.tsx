import { withApiAuth, supabaseServerClient } from '@supabase/auth-helpers-nextjs'
import { dateFormat } from '@/lib/validation'

type analytics = {
	readRequests?: number,
	createRequests?: number,
	status?: number
}

export default withApiAuth(
	async function ProtectedRoute ( req, res ) {
		const query = req?.query
	    let data: analytics = {
			readRequests: 0,
			createRequests: 0,
			status: 0
		}

	    if (query?.user_id) {
			let x = new Date(), yFormat = dateFormat(new Date(x.getFullYear(), x.getMonth()-1, x.getMonth()))
			let createRequests = 0, readRequests = 0

			const { data: createReq } = await supabaseServerClient({ req, res })
	            .from('requests')
				.select('count')
	            .eq('user_id', query?.user_id)
	            .eq('type', 'create')
				.gt('created_at', yFormat)

			for (let i = createReq?.length; i--;) {
				createRequests += createReq[i]?.count
			}

			const { data: readReq } = await supabaseServerClient({ req, res })
	            .from('requests')
				.select('count')
	            .eq('user_id', query?.user_id)
	            .eq('type', 'read')
				.gt('created_at', yFormat)

			for (let i = readReq?.length; i--;) {
				readRequests += readReq[i]?.count
			}

			data.readRequests = readRequests
			data.createRequests = createRequests
			data.status = 200
	    }

	    return res.status(200).json(data)
	}
)
