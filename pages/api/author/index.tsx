import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
	let authors
	const prisma = new PrismaClient()
	const query = req?.query

	console.log(query)
	if (query?.letter) {
		authors = await prisma.author.findMany({
			where: {
				name: {
					startsWith: query?.letter ?? 'a'
				}
			}
		})
	}
	else if (query?.random === 'true' && query?.number && !query?.search) {
		const count = await prisma.author.count()
        const skip = Math.floor(Math.random() * count)
		authors = await prisma.author.findMany({
			take: parseInt(query?.number) ?? 10,
            skip: skip,
            orderBy: {
				id: 'desc',
            }
		})
	}
	else if (query?.random === 'true' && query?.number && query?.search) {
		authors = await prisma.author.findMany({
			take: parseInt(query?.number) ?? 10,
			where: {
				name: {
					contains: query?.qearch,
				}
			}
		})
	}

	res.status(200).json(authors)
}