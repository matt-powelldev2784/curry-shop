import { NextResponse } from 'next/server'
import { auth } from '@//auth'
import { isValidCartItem } from '@/app/lib/isValidCartItem'
import prisma from '@/prisma/prisma'
import type { Prisma } from '@prisma/client'

export const POST = auth(async (req) => {
  try {
    // get the user email from the auth object
    const userEmail = req.auth?.user?.email
    if (!userEmail) {
      return NextResponse.json(
        { error: 'No user not available.' },
        { status: 400 }
      )
    }

    // get the userId using the email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
      },
    })

    // validate the userId
    if (!user || typeof user.id !== 'string') {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
    }

    // get the cart items from the body
    const { groupedCartItems, orderTotal } = await req.json()

    /// validate the body returns a valid array of cart items
    if (!Array.isArray(groupedCartItems)) {
      return NextResponse.json(
        { error: 'Cart Items should be an array' },
        { status: 400 }
      )
    }
    if (!groupedCartItems.every(isValidCartItem)) {
      return NextResponse.json(
        {
          error:
            'The cart item array contains a missing property or invalid type',
        },
        { status: 400 }
      )
    }

    console.log('groupedCartItems', groupedCartItems)

    // Create the order
    const order: Prisma.OrderCreateInput = {
      user: {
        connect: { id: user.id },
      },
      totalPrice: orderTotal,
      orderItems: {
        create: groupedCartItems.map((item) => {
          return {
            quantity: item.quantity,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          }
        }),
      },
    }

    const createdOrder = await prisma.order.create({
      data: order,
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json(createdOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}) as any // eslint-disable-line @typescript-eslint/no-explicit-any
// this is a temporary fix for the authjs typing issue
// https://github.com/nextauthjs/next-auth/issues/12224
