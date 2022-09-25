import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
	let quotes
	const prisma = new PrismaClient()
	const query = req?.query

	if (query?.random === 'true' && query?.number && query?.target) {
		// get random real quotes from database
		if (query?.target === 'database') {
			const count = await prisma.quote.count()
			const skip = Math.floor(Math.random() * count)
			quotes = await prisma.quote.findMany({
				take: parseInt(query?.number) ?? 9,
				skip: skip,
				orderBy: {
					id: 'desc',
				}
			})
		}
	}
	if (query?.random === 'false' && query?.number && query?.target && query?.author) {
		const name = (query?.author)?.replace(/\s/g, '')
		// get real quotes from database by author
		// get pagination
		if (query?.target === 'database' && query?.skip) {
			quotes = await prisma.quote.findMany({
				take: parseInt(query?.number) ?? 9,
				skip: parseInt(query?.skip) ?? 0,
				orderBy: {
					id: 'desc',
				},
				where: {
					author_name: {
						contains: name
					}
				}
			})
		}
	}

	res.status(200).json(quotes)
}