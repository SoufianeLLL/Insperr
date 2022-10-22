import prisma from "@/utils/prisma"

export default async function handler(req, res) {
	
	// const query = req?.query
	let topics

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