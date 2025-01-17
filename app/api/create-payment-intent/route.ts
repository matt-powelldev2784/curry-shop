import { convertToSubCurrency } from '@/app/lib/convertToSubCurrency'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { auth } from '@/auth'
import { sanityClient } from '@/app/sanity/client'
import { SanityDocument } from 'next-sanity'
import { isValidCartItem } from '@/app/lib/isValidCartItem'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Stripe secret key is not defined in environment variables')
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia',
})

// sanity cdn menu items query
const MENU_ITEMS_QUERY = `*[_type == "menuItems"]{ _id, name, description, price, menuItemType, image, slug }`

export const POST = auth(async (req) => {
  try {
    //check if user is authenticated
    const auth = req.auth
    if (!auth) {
      return NextResponse.json(
        { error: 'User not authorised.' },
        { status: 401 }
      )
    }

    const { cartItems, orderTotal } = await req.json()

    /// validate the body returns a valid array of cart items
    if (!Array.isArray(cartItems)) {
      return NextResponse.json(
        { error: 'Cart Items should be any array' },
        { status: 400 }
      )
    }
    if (!cartItems.every(isValidCartItem)) {
      return NextResponse.json(
        {
          error:
            'The cart item array contains a missing property or invalid type',
        },
        { status: 400 }
      )
    }

    /// validate the body returns a valid order total
    if (orderTotal === undefined || typeof orderTotal !== 'number') {
      return NextResponse.json(
        { error: 'Order total should be a number' },
        { status: 400 }
      )
    }

    // get menu items and prices from sanity cdn
    const menuItems: SanityDocument[] =
      await sanityClient.fetch(MENU_ITEMS_QUERY)

    // securely calculate the total price of the order on the server
    const validatedPrice: number = cartItems.reduce((total, cartItem) => {
      const menuItem = menuItems.find((item) => item._id === cartItem.id)
      if (menuItem) {
        return total + menuItem.price * cartItem.quantity
      }
      return total
    }, 0)

    // compare the validated price from the server with the order total sent from the client
    // return an error if values do not match
    if (validatedPrice !== orderTotal) {
      return NextResponse.json(
        { error: 'Invalid order total' },
        { status: 400 }
      )
    }

    // valid that order amount is a number
    if (typeof validatedPrice !== 'number') {
      return NextResponse.json(
        { error: 'Error fetching order amount' },
        { status: 500 }
      )
    }

    // create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: convertToSubCurrency(validatedPrice),
      currency: 'gbp',
      automatic_payment_methods: { enabled: true },
    })

    // return the client secret to the client
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    )
  } catch (error) {
    console.error('Internal Error:', error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}) as any // eslint-disable-line @typescript-eslint/no-explicit-any
// this is a temporary fix for the authjs typing issue
// https://github.com/nextauthjs/next-auth/issues/12224
