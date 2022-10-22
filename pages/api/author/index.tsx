import prisma from "@/utils/prisma"

export default async function handler(req, res) {

	const query = req?.query
	let authors

	// get Authors list started with specific letter
	if (query?.letter) {
		authors = await prisma.author.findMany({
			where: {
				name: {
					startsWith: query?.letter ?? 'a'
				}
			}
		})
	}
	// get random Authors
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
	// get Authors list from seach query
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

	return res.status(200).json(authors)
}