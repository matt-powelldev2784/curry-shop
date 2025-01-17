import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@//auth'
import { isValidCartItem } from '@/app/lib/isValidCartItem'
import { prisma } from '@/prisma/prisma'
import { CartItem } from '@/app/context/CartContext'

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth()
    if (!session?.user) throw new Error('User not authenticated')
    if (!session?.user.id) throw new Error('No user id found in session')

    const userId = session.user.id
    console.log('userId', userId)
    const { groupedCartItems, orderTotal } = await req.json()

    /// validate the body returns a valid array of cart items
    if (!Array.isArray(groupedCartItems)) {
      return NextResponse.json({ error: 'Cart Items should be any array' })
    }
    if (!groupedCartItems.every(isValidCartItem)) {
      return NextResponse.json({
        error:
          'The cart item array contains a missing property or invalid type',
      })
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice: orderTotal,
        orderItems: {
          create: groupedCartItems.map((item: CartItem) => ({
            quantity: item.quantity,
            name: item.name,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}
