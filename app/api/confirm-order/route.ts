import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'

export const POST = auth(async (req) => {
  try {
    //check if user is authenticated
    // const auth = req.auth
    // console.log('auth', auth)
    // if (!auth) {
    //   return NextResponse.json(
    //     { error: 'User not authorised.' },
    //     { status: 401 }
    //   )
    // }

    // get the orderId from the request body
    const { orderId } = await req.json()

    // update the order in the database to confirmed
    const confirmedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderConfirmed: true,
      },
    })

    // return the confirmed order
    return NextResponse.json(confirmedOrder, { status: 200 })
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
