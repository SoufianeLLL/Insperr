import { supabaseServerClient } from '@supabase/auth-helpers-nextjs'

type analytics = {
	generatedQuotes?: number,
	quotesVisits?: number,
	quotesVisitsYearly?: number,
	status?: number
}

export default async function handler(req, res) {
	
	const query = req?.query
	const data: analytics = {
		generatedQuotes: 0,
		quotesVisits: 0,
		quotesVisitsYearly: 0,
		status: 0
	}

	const rectifyFormat = (s) => {
		let b = s.split(/\D/)
		return b[0] + '-' + b[1] + '-' + b[2] + 'T' +
			   b[3] + ':' + b[4] + ':' + b[5] + '.' +
			   b[6].substr(0,3) + '+00:00';
	}

	if (query?.id) {
		const { data: quotes } = await supabaseServerClient({ req, res })
			.from("quotes")
			.select("id, views, created_at")
			.eq('type', 'custom')
		
		if (quotes) {
			const now = new Date()
			let visitsMonthly = 0, visitsYearly = 0
			for (let i = quotes.length; i--;) {
				const then = new Date(rectifyFormat(quotes[i]?.created_at))
				const dateY = +then + 1000*60*60*24*365 < +now
				if (!dateY) {
					visitsYearly += quotes[i]?.views
				}
				const dateM = Math.abs(then.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
				if (dateM < 30) {
					visitsMonthly += quotes[i]?.views
				}
			}
			data.generatedQuotes = quotes?.length
			data.quotesVisits = visitsMonthly
			data.quotesVisitsYearly = visitsYearly
			data.status = 200
		}
	}

	return res.status(200).json(data)
}