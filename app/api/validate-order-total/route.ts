import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/app/sanity/client'
import { SanityDocument } from 'next-sanity'

const MENU_ITEMS_QUERY = `*[_type == "menuItems"]{ _id, name, description, price, menuItemType, image, slug }`

export async function POST(req: NextRequest) {
  try {
    const { cartItems, orderTotal } = await req.json()

    /// validate the body returns a valid array of cart items
    if (!Array.isArray(cartItems)) {
      return NextResponse.json({ error: 'Cart Items should be any array' })
    }
    if (!cartItems.every(isValidCartItem)) {
      return NextResponse.json({
        error:
          'The cart item array contains a missing property or invalid type',
      })
    }

    /// validate the body returns a valid order total
    if (orderTotal === undefined || typeof orderTotal !== 'number') {
      return NextResponse.json({ error: 'Order total should be a number' })
    }

    const menuItems: SanityDocument[] =
      await sanityClient.fetch(MENU_ITEMS_QUERY)

    // securely calculate the total price of the order on the server
    const totalPrice: number = cartItems.reduce((total, cartItem) => {
      const menuItem = menuItems.find((item) => item._id === cartItem.id)
      if (menuItem) {
        return total + menuItem.price * cartItem.quantity
      }
      return total
    }, 0)

    // compare the secure total price from the server with the order total sent from the client
    // return an error if values do not match
    if (totalPrice !== orderTotal) {
      return NextResponse.json({ error: 'Invalid order total' })
    }

    return NextResponse.json(totalPrice)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidCartItem = (item: any) => {
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.quantity === 'number' &&
    typeof item.price === 'number' &&
    typeof item.imageUrl === 'string'
  )
}
