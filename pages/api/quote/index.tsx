import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
	let quotes
	const prisma = new PrismaClient()
	const query = req?.query

	const limit = parseInt(query?.number) ?? 9

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
						topics: {
							contains: topic
						}
					}
				})
				return res.json({ quotes, nextId: quotes.length === limit ? quotes[limit - 1].id : undefined })
			}
			break;


		case 'getRandomQuotes':
			// get random real quotes from database
			if (query?.target === 'database') {
				const count = await prisma.quote.count()
				const skip = Math.floor(Math.random() * count)
				quotes = await prisma.quote.findMany({
					take: limit,
					skip: skip,
					orderBy: {
						id: 'desc',
					}
				})
			}
			break;
	}

	return res.status(200).json(quotes)
}