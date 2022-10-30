// import prisma from '@/utils/prisma'
// import supabaseAdmin from '@/utils/supabase-admin'


export default async function handler(req, res) {

	// const query = req?.query
	// console.log(query)
	// const limit = parseInt(query?.number) ?? 9
	let result

	// switch (query?.action) {
		// case 'getQuotesByAuthorName':
		// 	const name = (query?.author)?.replace(/\s/g, '') ?? null
		// 	// get real quotes from database by author
		// 	if (name) {
		// 		const cursor = query.cursor ?? ''
		// 		const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) }
		// 		const quotes = await prisma.quote.findMany({
		// 			skip: cursor !== '' ? 1 : 0,
		// 			cursor: cursorObj,
		// 			take: limit,
		// 			where: {
		// 				published: true,
		// 				author_name: {
		// 					contains: name
		// 				}
		// 			}
		// 		})
		// 		result = { quotes, nextId: quotes.length === limit ? quotes[limit - 1].id : undefined }
		// 	}
		// 	break;
		

		// case 'getQuotesByTopic':
		// 	const topic = (query?.topic)?.replace(/\s/g, '') ?? null
		// 	// get real quotes from database by topic
		// 	if (topic) {
		// 		const cursor = query.cursor ?? ''
		// 		const cursorObj = cursor === '' ? undefined : { id: parseInt(cursor as string, 10) }
		// 		const quotes = await prisma.quote.findMany({
		// 			skip: cursor !== '' ? 1 : 0,
		// 			cursor: cursorObj,
		// 			take: limit,
		// 			where: {
		// 				published: true,
		// 				topics: {
		// 					contains: topic
		// 				}
		// 			}
		// 		})
		// 		result = { quotes, nextId: quotes.length === limit ? quotes[limit - 1].id : undefined }
		// 	}
		// 	break;


		// case 'getRandomQuotes':
		// 	// get random real quotes from SLite database (self hosted)
		// 	const count = await prisma.quote.count()
		// 	const skip = Math.floor(Math.random() * count)
		// 	result = await prisma.quote.findMany({
		// 		take: limit,
		// 		skip: skip,
		// 		where: {
		// 			published: true,
		// 		},
		// 		orderBy: {
		// 			id: 'desc',
		// 		}
		// 	})
		

		// case 'getRandomCustomQuotes':
		// 	// get random quotes from Supabase
		// 	const { data: randomQuotes } = await supabaseAdmin
		// 		.from('random_quotes')
		// 		.select('*')
		// 		.limit(+(query?.number) ?? 10)

		// 	result = randomQuotes
		// 	break;
	// }

	return res.status(200).json(result)
}