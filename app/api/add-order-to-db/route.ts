import { NextResponse } from 'next/server'
import { auth } from '@//auth'
import { isValidCartItem } from '@/app/lib/isValidCartItem'
import { prisma } from '@/prisma/prisma'
import type { Prisma } from '@prisma/client'

export const POST = auth(async (req) => {
  try {
    // get the user email from the auth object
    const userEmail = req.auth?.user?.email
    if (!userEmail) {
      return NextResponse.json({ error: 'No user not available.' })
    }

    // get the userId using the email
    const userId = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    })

    // validate the userId
    if (!userId || typeof userId.id !== 'string') {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
    }

    // get the cart items from the body
    const { groupedCartItems, orderTotal } = await req.json()

    /// validate the body returns a valid array of cart items
    if (!Array.isArray(groupedCartItems)) {
      return NextResponse.json({ error: 'Cart Items should be an array' })
    }
    if (!groupedCartItems.every(isValidCartItem)) {
      return NextResponse.json({
        error:
          'The cart item array contains a missing property or invalid type',
      })
    }

    // Create the order
    const order: Prisma.OrderCreateInput = {
      user: {
        connect: { id: userId.id },
      },
      totalPrice: orderTotal,
      orderItems: {
        create: groupedCartItems.map((item) => ({
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })),
      },
    }

    const createdOrder = await prisma.order.create({
      data: order,
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(createdOrder)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
})
