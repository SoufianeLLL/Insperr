import { buffer } from "micro"
import stripe from "@/utils/stripejs"
import supabaseAdmin from "@/utils/supabase-admin"

export const config = { api: { bodyParser: false } }


export default async function handler(req, res) {

	const signature = req.headers["stripe-signature"]
	const signingSecret = process.env.STRIPE_SIGNING_SECRET_TEST
	const reqBuffer = await buffer(req)

	let event

	try {
		event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
	}
	catch (error) {
		return res.status(400).send(`Webhook error: ${error.message}`)
	}

	
	switch (event?.type) {
		// Update subscription status when it's active
		case "customer.subscription.updated":
			if (event?.data?.object?.status === 'active') {
				await supabaseAdmin
					.from('subscription')
					.update({
						is_subscribed: true
					})
					.eq('customer_id', event?.data?.object?.customer)
			}
			break;
		
		// Create new subscription
		case "customer.subscription.created":
			// Get user ID by customer ID
			const { data: { id } } = await supabaseAdmin
				.from('users')
				.select('id')
				.eq('stripe_customer_id', event?.data?.object?.customer)
				.single()

			if (id) {
				await supabaseAdmin
					.from('logs')
					.insert({
						log: {
							user_id: id ?? null,
							customer_id: event?.data?.object?.customer ?? null,
							is_subscribed: event?.data?.object?.status === 'active' ? true : false,
							metadata: {
								subscription_id: event?.data?.object?.id ?? null,
								status: event?.data?.object?.status ?? null,
								invoice_id: event?.data?.object?.latest_invoice ?? null,
								amount: event?.data?.object?.items?.data[0]?.plan?.amount ?? null,
								currency: event?.data?.object?.currency ?? null,
								interval: event?.data?.object?.items.data[0].plan.interval ?? null,
								interval_count: event?.data?.object?.items.data[0].plan.interval_count ?? null,
								current_period_end: event?.data?.object?.current_period_end ?? null,
								current_period_start: event?.data?.object?.current_period_start ?? null,
							},
							price_id: event?.data?.object?.items.data[0].plan.id ?? null,
							product_id: event?.data?.object?.items.data[0].plan.product ?? null
						}
					})
				
				await supabaseAdmin
					.from('subscription')
					.insert({
						user_id: id ?? null,
						customer_id: event?.data?.object?.customer ?? null,
						is_subscribed: event?.data?.object?.status === 'active' ? true : false,
						metadata: {
							subscription_id: event?.data?.object?.id ?? null,
							status: event?.data?.object?.status ?? null,
							invoice_id: event?.data?.object?.latest_invoice ?? null,
							amount: event?.data?.object?.items?.data[0]?.plan?.amount ?? null,
							currency: event?.data?.object?.currency ?? null,
							interval: event?.data?.object?.items.data[0].plan.interval ?? null,
							interval_count: event?.data?.object?.items.data[0].plan.interval_count ?? null,
							current_period_end: event?.data?.object?.current_period_end ?? null,
							current_period_start: event?.data?.object?.current_period_start ?? null,
						},
						price_id: event?.data?.object?.items.data[0].plan.id ?? null,
						product_id: event?.data?.object?.items.data[0].plan.product ?? null
					})
			} 
			else {
				return res.status(400).send(`An error was occured, please contact support.`)
			}
			break;
		
		// Delete subscription
		case "customer.subscription.deleted":
			await supabaseAdmin
				.from('subscription')
				.delete()
				.eq('customer_id', event?.data?.object?.customer)
				.eq('metadata->subscription_id', event?.data?.object?.id)
			break;
	}

	res.send({ received: true })
}