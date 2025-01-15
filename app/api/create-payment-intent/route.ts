import { convertToSubCurrency } from '@/app/lib/convertToSubCurrency'
import { postRequest } from '@/app/lib/apiCallUtils'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/app/api/auth/auth'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined in environment variables')
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) throw new Error('User not authenticated')

    const { cartItems, orderTotal } = await request.json()

    // securely get order amount from server
    const domain = process.env.NEXT_PUBLIC_DOMAIN
    const validatedPrice = await postRequest(
      `${domain}/api/validate-order-total`,
      { cartItems, orderTotal }
    )

    // valid that order amount is a number
    if (typeof validatedPrice !== 'number') {
      return NextResponse.json(
        { error: 'Error fetching order amount' },
        { status: 500 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToSubCurrency(validatedPrice),
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Internal Error:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}
