'use client'

import Checkout from '@/app/components/checkout/Checkout'
import { useCartContext } from '@/app/context/CartContext'
import { convertToSubCurrency } from '@/app/lib/convertToSubCurrency'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined')
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const CheckoutPage = () => {
  const { orderTotal } = useCartContext()

  return (
    <section className="flex items-start justify-center w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <Elements
        stripe={stripePromise}
        options={{
          mode: 'payment',
          amount: convertToSubCurrency(orderTotal),
          currency: 'gbp',
        }}
      >
        <Checkout />
      </Elements>
    </section>
  )
}

export default CheckoutPage
