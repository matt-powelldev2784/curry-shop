import BasketItem from '@/app/components/basket/BasketItem'
import prisma from '@/prisma/prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import orderIcon from '../../../assets/icons/orders_pink.png'
import Image from 'next/image'
import { auth } from '@/auth'
import Link from 'next/link'

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
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/pages/login')
  }

  const { slug } = await params
  const order = await getOrder(slug)
  const totalPrice = Number(order.totalPrice)
  const orderDate = new Date(order.updatedAt).toLocaleDateString('en-GB')

  return (
    <section className="flex flex-col items-center justify-start w-full min-h-screen min-w-[320px] pb-20 bg-twLightGrey">
      <article className="flexCol w-full max-w-[700px] md:rounded-3xl md:border-2 md:border-twPink sm:px-2 md:mx-4 md:mt-8 pb-8">
        <div className="flex flex-col items-center justify-center p-4 pt-8">
          <Image src={orderIcon} width={75} height={75} alt="" />
          <h1 className="p-2 text-3xl text-black">Order Details</h1>
          <p>Order Date: {orderDate}</p>
        </div>

        <div className="w-full">
          <div className="my-1 flex flex-row items-center justify-between bg-twPink">
            <div className="relative w-3/12 object-cover"></div>
            <p className="m-1 w-4/12 pl-2 text-white ">Item</p>
            <p className="m-1 w-2/12 text-white text-left">Qty</p>
            <p className="m-1 w-2/12 text-white">Price</p>
            <p className="m-1 w-1/12 text-twPink">x</p>
          </div>
        </div>

        <div className="max-h-[15rem] w-full overflow-y-auto">
          {order.orderItems.map((cartItem) => {
            return (
              <BasketItem
                key={cartItem.id}
                id={cartItem.id}
                name={cartItem.name}
                price={Number(cartItem.price)}
                quantity={cartItem.quantity}
                imageUrl={cartItem.imageUrl}
              />
            )
          })}
        </div>

        <div className="w-full bg-twPink text-right text-twWhite ">
          <div className="my-1 flex flex-row items-center justify-between bg-twPink">
            <div className="relative w-3/12 object-cover"></div>
            <p className="m-1 w-4/12 pl-2 text-twPink">x</p>
            <p className="m-1 w-2/12 text-twWhite text-right">Total:</p>
            <p className="m-1 w-2/12 text-twWhite font-bold text-left">
              {totalPrice.toLocaleString('en-GB', {
                style: 'currency',
                currency: 'GBP',
              })}
            </p>
            <p className="m-1 w-1/12 text-twPink">x</p>
          </div>
        </div>
      </article>

      <Link
        className="h-[40px] w-[300px] text-white bg-twBlack my-5 flexCol rounded-lg active:bg-black/75"
        href="/pages/orders?page=0"
      >
        Back to orders list
      </Link>
    </section>
  )
}

export default OrderPage
