import prisma from '@/prisma/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const getOrder = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    })

    if (!order) {
      redirect('/pages/error')
    }

    return order
  } catch (error) {
    console.error('Internal Error:', error)
    redirect('/pages/error')
  }
}

type OrderPageParams = { params: Promise<{ slug: string }> }

const OrderPage = async ({ params }: OrderPageParams) => {
  const { slug } = await params
  console.log('slug', slug)
  const order = await getOrder(slug)
  console.log('order', order)

  return <div>page</div>
}

export default OrderPage
