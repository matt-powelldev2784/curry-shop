'use client'

import React from 'react'
import cartIcon from '../../assets/icons/cart_pink.png'
import Image from 'next/image'
import { CartItem, useCartContext } from '@/app/context/CartContext'
import OrderItem from './OrderItem'
import Link from 'next/link'

const ConfirmOrder = () => {
  const { groupedCartItems } = useCartContext()
  console.log('groupedCartItems', groupedCartItems)

  return (
    <article className="flexCol w-full max-w-[700px] lg:rounded-3xl md:border-2 md:border-twPink px-4 md:mt-8">
      <div className="flex flex-col items-center justify-center p-4">
        <Image src={cartIcon} width={75} height={75} alt="" />
        <h1 className="p-2 text-3xl">CHECKOUT</h1>
      </div>

      <div className="w-full">
        <div className="my-1 flex flex-row items-center justify-between bg-twPink">
          <div className="relative w-3/12 object-cover"></div>
          <p className="m-1 w-4/12 pl-2 text-white ">Item</p>
          <p className="m-1 w-2/12 text-white">Qty</p>
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

      <div className="w-full bg-twPink p-2 text-right text-twWhite ">
        <p className="text-bold inline">Order Total = </p>
        <p className="text-bold inline"></p>
      </div>

      <Link href="/pages/confirm-order">
        <button className="h-[40px] min-w-[200px] md:min-w-[300px] w-10/12 text-white bg-twPink my-5">
          Confirm order
        </button>
      </Link>
    </article>
  )
}

export default ConfirmOrder
