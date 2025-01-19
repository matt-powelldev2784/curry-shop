'use client'

import React from 'react'
import cartIcon from '../../assets/icons/cart_pink.png'
import Image from 'next/image'
import { CartItem, useCartContext } from '@/app/context/CartContext'
import OrderItem from './BasketItem'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { postRequest } from '@/app/lib/apiCallUtils'

type BasketProps = {
  basketTitle: string
  onConfirmOrderRoute: string
}

const Basket = ({ basketTitle, onConfirmOrderRoute }: BasketProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { groupedCartItems, orderTotal } = useCartContext()

  const onConfirmOrder = async () => {
    if (!groupedCartItems.length) return
    if (!session) {
      return router.push('/pages/login')
    }
    // const order = await postRequest('/api/add-order-to-db', {
    //   groupedCartItems,
    //   orderTotal,
    // })
    // console.log('order', order)

    router.push(onConfirmOrderRoute)
  }

  return (
    <article className="flexCol w-full max-w-[700px] md:rounded-3xl md:border-2 md:border-twPink px-4 md:mt-8 ">
      <div className="flex flex-col items-center justify-center p-4 pt-8">
        <Image src={cartIcon} width={75} height={75} alt="" />
        <h1 className="p-2 text-3xl text-black">{basketTitle}</h1>
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
        {groupedCartItems.map((cartItem: CartItem) => {
          return (
            <OrderItem
              key={cartItem.id}
              id={cartItem.id}
              name={cartItem.name}
              price={cartItem.price}
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
            {orderTotal.toLocaleString('en-GB', {
              style: 'currency',
              currency: 'GBP',
            })}
          </p>
          <p className="m-1 w-1/12 text-twPink">x</p>
        </div>
      </div>

      <button
        className="h-[40px] w-[300px] text-white bg-twBlack my-5"
        onClick={onConfirmOrder}
      >
        Checkout
      </button>
    </article>
  )
}

export default Basket
