'use client'

import Checkout from '@/app/components/checkout/Checkout'
import { convertToSubCurrency } from '@/app/lib/convertToSubCurrency'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Home = () => {
  const amount = 49.99

  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubCurrency(amount),
          currency: 'gbp',
        }}
      >
        <Checkout amount={amount} />
      </Elements>
    </section>
  )
}

export default Home
