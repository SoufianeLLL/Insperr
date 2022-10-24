import { buffer } from "micro"
import stripe from "@/utils/stripejs"
import { withApiAuth } from "@supabase/auth-helpers-nextjs"

export const config = { api: { bodyParser: false } }


export default withApiAuth(async function handler(req, res, supabaseServerClient) {

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

    switch (event.type) {
        case "customer.subscription.created":
            await supabaseServerClient
                .from('subscription')
                .update({
                    customer_id: event.data.object.customer,
                    is_subscribed: event.data.object.paid,
                    metadata: {
                        payment_status: event?.data?.object?.payment_status,
                        amount_subtotal: event?.data?.object?.amount_subtotal,
                        amount_total: event?.data?.object?.amount_total,
                        currency: event?.data?.object?.currency,
                        email: event?.data?.object?.customer_details?.email,
                        name: event?.data?.object?.customer_details?.name,
                        next_payment: event?.data?.object?.next_payment_attempt,
                        interval: event.data.object.items.data[0].plan.interval,
                        interval_count: event.data.object.items.data[0].plan.interval_count,
                        // interval: event.data.object.items.data[0].plan.interval,
                    },
                    price_id: event.data.object.items.data[0].plan.id,
                    product_id: event.data.object.items.data[0].plan.product
                })
          break;
    }

    console.log({ event })
    res.send({ received: true })
})