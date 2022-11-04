import supabaseAdmin from '@/utils/supabase-admin'

export default async function handler(req, res) {
	
	// get Topics list
	const { data: topics } = await supabaseAdmin
		.from('quotes_topics')
		.select()
		.order('name', { ascending: true })

    return res.status(200).json(topics)
}