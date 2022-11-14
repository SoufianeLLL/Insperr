import stripe from "@/utils/stripejs"
import supabaseAdmin from '@/utils/supabase-admin'


export default async function handler(req, res) {
	if (req.query.API_SECRET_KEY !== process.env.API_SECRET_KEY) {
		return res.status(401).send("You are not authorized to call this API");
	}

	await supabaseAdmin
		.from('logs')
		.insert({
			log: JSON.stringify(req.body.record)
		})

	const customer = await stripe.customers.create({
		email: req.body.record.email,
		name: req.body.record.raw_user_meta_data.full_name
	})

	await supabaseAdmin
		.from('users')
		.update({
			stripe_customer_id: customer.id
		})
		.eq('id', req.body.record.id)

	res.send({ message: `stripe customer created: ${customer.id}` })
}