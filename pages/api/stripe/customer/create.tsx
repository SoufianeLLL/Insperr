import { v4 as uuidv4 } from 'uuid'
import stripe from "@/utils/stripejs"


export default async function handler(req, res, supabaseServerClient) {
	if (req.query.API_SECRET_KEY !== process.env.API_SECRET_KEY) {
		return res.status(401).send("You are not authorized to call this API");
	}

	const customer = await stripe.customers.create({
		email: req.body.record.email,
	})

	await supabaseServerClient
		.from('users')
		.update({
			stripe_customer_id: customer.id,
			api_key: uuidv4.replaceAll('-', '')
		})
		.eq('id', req.body.record.id)

	res.send({ message: `stripe customer created: ${customer.id}` })
}