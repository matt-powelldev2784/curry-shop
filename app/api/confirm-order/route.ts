import { NextResponse } from 'next/server'
import { auth } from '@//auth'
import { prisma } from '@/prisma/prisma'
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
