'use client'

import Image from 'next/image'
import React from 'react'
import deleteIcon from '../../assets/icons/x_square.png'

type OrderItemProps = {
  name: string
  price: number
  imageUrl: string
  quantity: number
}

const OrderItem = ({ name, quantity, price, imageUrl }: OrderItemProps) => {
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
        <p className="m-1 w-2/12 text-center text-white">{quantity}</p>
        <p className="m-1 w-2/12 text-white">{price}</p>
        <p className="m-1 w-1/12 text-white" onClick={() => {}}>
          <Image src={deleteIcon} width={25} height={25} alt="" />
        </p>
      </div>
    </article>
  )
}

export default OrderItem
