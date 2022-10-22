import { supabaseServerClient } from '@supabase/auth-helpers-nextjs'
import prisma from '@/utils/prisma'


export default async function handler(req, res) {

	const query = req?.query
	const limit = parseInt(query?.number) ?? 9
	let quotes

	switch (query?.action) {
		case 'getQuotesByAuthorName':
			const name = (query?.author)?.replace(/\s/g, '') ?? null
			// get real quotes from database by author
			if (query?.target === 'database' && name) {
				const cursor = query.cursor ?? ''
				const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) }
				const quotes = await prisma.quote.findMany({
					skip: cursor !== '' ? 1 : 0,
					cursor: cursorObj,
					take: limit,
					where: {
						published: true,
						author_name: {
							contains: name
						}
					}
				})
				return res.json({ quotes, nextId: quotes.length === limit ? quotes[limit - 1].id : undefined })
			}
			break;
		

		case 'getQuotesByTopic':
			const topic = (query?.topic)?.replace(/\s/g, '') ?? null
			// get real quotes from database by topic
			if (query?.target === 'database' && topic) {
				const cursor = query.cursor ?? ''
				const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) }
				const quotes = await prisma.quote.findMany({
					skip: cursor !== '' ? 1 : 0,
					cursor: cursorObj,
					take: limit,
					where: {
						published: true,
						topics: {
							contains: topic
						}
					}
				})
				return res.json({ quotes, nextId: quotes.length === limit ? quotes[limit - 1].id : undefined })
			}
			break;


		case 'getRandomQuotes':
			// get random real quotes from SLite database (self hosted)
			if (query?.target === 'database') {
				const count = await prisma.quote.count()
				const skip = Math.floor(Math.random() * count)
				quotes = await prisma.quote.findMany({
					take: limit,
					skip: skip,
					where: {
						published: true,
					},
					orderBy: {
						id: 'desc',
					}
				})
			}
			// get random custom quotes from Supabase (supabase.io)
			if (query?.target === 'custom') {
				const { data: result } = await supabaseServerClient({ req, res })
					.from('random_quotes')
					.select('*')

				quotes = result
			}
			break;
	}

	return res.status(200).json(quotes)
}