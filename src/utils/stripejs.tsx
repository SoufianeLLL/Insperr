const Stripe = require('stripe')
const stripe = Stripe(process.env.NODE_ENV === 'development' ? process.env.STRIPE_SECRET_KEY_TEST : process.env.STRIPE_SECRET_KEY)

export default stripe

// import { Stripe, loadStripe } from '@stripe/stripe-js'

// let stripePromise: Promise<Stripe | null>

// const getStripe = () => {
// 	if (!stripePromise) {
// 		stripePromise = loadStripe(process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)
// 	}
// 	return stripePromise
// }

// export default getStripe