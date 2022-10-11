import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
	let topics
	const prisma = new PrismaClient()
	const query = req?.query

	// get Topics list
	// if (query?.letter) {
		topics = await prisma.topic.findMany({
			orderBy: {
                name: 'asc',
            }
		})
	// }

    return res.status(200).json(topics)
}