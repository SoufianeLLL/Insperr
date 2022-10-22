const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY_TEST)

export default stripe

// import { Stripe, loadStripe } from '@stripe/stripe-js'

// let stripePromise: Promise<Stripe | null>

// const getStripe = () => {
// 	if (!stripePromise) {
// 		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST!)
// 	}
// 	return stripePromise
// }

// export default getStripe