'use client'

import Image from 'next/image'
import React from 'react'
import deleteIcon from '../../assets/icons/x_square.png'
import { useCartContext } from '@/app/context/CartContext'

type OrderItemProps = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

const BasketItem = ({
  id,
  name,
  quantity,
  price,
  imageUrl,
}: OrderItemProps) => {
  const { removeFromCart } = useCartContext()
  const totalPrice = price * quantity

  return (
    <article className="w-full text-sm md:text-base bg-twPink ">
      <div className="my-1 flex flex-row items-center justify-between bg-primaryPink">
        <div className="relative min-h-[3rem] w-3/12 min-w-[3rem] ">
          <Image
            src={imageUrl}
            fill
            style={{ objectFit: 'cover' }}
            alt={name}
            quality={30}
            sizes="(max-width: 600px) 50px, 100px"
          />
        </div>
        <p className="m-1 w-4/12 break-words pl-2 text-white">{name}</p>
        <p className="m-1 w-2/12 text-left text-white pl-3">{quantity}</p>
        <p className="m-1 w-2/12 text-white">
          {totalPrice.toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP',
          })}
        </p>
        <p
          className="m-1 w-1/12 text-white"
          onClick={() => {
            removeFromCart(id)
          }}
        >
          <Image src={deleteIcon} width={25} height={25} alt="" />
        </p>
      </div>
    </article>
  )
}

export default BasketItem
