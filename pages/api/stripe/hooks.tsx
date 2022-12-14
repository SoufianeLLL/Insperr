import { buffer } from "micro"
import stripe from "@/utils/stripejs"
import sendEmail from "@/utils/sendgrid"
import supabaseAdmin from "@/utils/supabase-admin"
import { timestampToDate } from "@/lib/validation"

export const config = { api: { bodyParser: false } }


export default async function handler(req, res) {

	const signature = req.headers["stripe-signature"]
	const signingSecret = process.env.NODE_ENV === 'development' ? process.env.STRIPE_SIGNING_SECRET_TEST : process.env.STRIPE_SIGNING_SECRET
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
					.from('subscriptions')
					.update({
						is_subscribed: event?.data?.object?.status === 'active' ? true : false,
						metadata: {
							subscription_id: event?.data?.object?.id ?? null,
							status: event?.data?.object?.status ?? null,
							invoice_id: event?.data?.object?.latest_invoice ?? null,
							amount: event?.data?.object?.items?.data[0]?.plan?.amount ?? null,
							currency: event?.data?.object?.currency ?? null,
							interval: event?.data?.object?.items.data[0].plan.interval ?? null,
							interval_count: event?.data?.object?.items.data[0].plan.interval_count ?? null,
							current_period_end: timestampToDate(event?.data?.object?.current_period_end) ?? null,
							current_period_start: timestampToDate(event?.data?.object?.current_period_start) ?? null,
						},
						price_id: event?.data?.object?.items.data[0].plan.id ?? null,
						product_id: event?.data?.object?.items.data[0].plan.product ?? null
					})
					.eq('customer_id', event?.data?.object?.customer)
			}
			break;
		
		// Create new subscription
		case "customer.subscription.created":
			// Get user ID by customer ID
			const { data: { id, email, fullname } } = await supabaseAdmin
				.from('users')
				.select('id, email, fullname')
				.eq('stripe_customer_id', event?.data?.object?.customer)
				.single()

			if (id && email) {
				await supabaseAdmin
					.from('subscriptions')
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
							current_period_end: timestampToDate(event?.data?.object?.current_period_end) ?? null,
							current_period_start: timestampToDate(event?.data?.object?.current_period_start) ?? null,
						},
						price_id: event?.data?.object?.items.data[0].plan.id ?? null,
						product_id: event?.data?.object?.items.data[0].plan.product ?? null
					})
				
				// Send Email
				await sendEmail({
					to: email,
					templateId: 'd-352a1be3bca2459ba4fe2e0e2f903bfd',
					extraData: {
						amount: event?.data?.object?.currency ?? '' + event?.data?.object?.items?.data[0]?.plan?.amount ?? '',
						name: fullname?.replace(/(\w+\s+)(\w+\s+)(\w+)/, '$1'),
					}
				})
			} 
			else {
				return res.status(400).send(`An error was occured, please contact support.`)
			}
			break;
		
		// Delete subscription
		case "customer.subscription.deleted":
			await supabaseAdmin
				.from('subscriptions')
				.delete()
				.eq('customer_id', event?.data?.object?.customer)
				.eq('metadata->subscription_id', event?.data?.object?.id)
			break;
	}

	res.send({ received: true })
}