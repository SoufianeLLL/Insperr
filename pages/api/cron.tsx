

export default async function handler(req, res, supabaseServerClient) {
	// if (req.query.API_SECRET_KEY !== process.env.API_SECRET_KEY) {
	// 	return res.status(401).send("You are not authorized to call this API");
	// }



	// const { data: Quotes } = await supabaseServerClient
	// 	.from('quotes')
	// 	.select('id, users(twitter_key)')
	//     .eq('tweeted', false)
	
	// if (Quotes && Quotes?.length > 0) {
	//     for (let i = 0; i < Quotes.length; i++) {
	//         const quote = Quotes[i]
	//         // Auto-Tweet to Twitter

	//         // Update quote status
	//         await supabaseServerClient
	//             .from('quotes')
	//             .update({ tweeted: true })
	//             .eq('id', quote?.id)
	//     }
	// }

	// res.send({ message: `Quotess has been tweeted successfully.` })
}