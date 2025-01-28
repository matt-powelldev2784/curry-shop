'use client'

import React, { useEffect } from 'react'
import cartIcon from '../../assets/icons/cart_pink.png'
import Image from 'next/image'
import { CartItem, useCartContext } from '@/app/context/CartContext'
import OrderItem from './BasketItem'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { usePostRequest } from '@/app/lib/clientApiHooks'
import Error from '../error/ClientError'
import Button from '@/app/ui/button/Button'

const Basket = () => {
  const router = useRouter()
  const session = useSession()

  const { groupedCartItems, orderTotal, cartItems, setCartItems } =
    useCartContext()
  const { postRequest, data, error, isLoading } = usePostRequest()
  const savedCartItems = localStorage.getItem('savedCartItems')

  useEffect(() => {
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems))
      localStorage.removeItem('savedCartItems')
    }
  }, [setCartItems, savedCartItems])

  const onConfirmOrder = async () => {
    if (!groupedCartItems.length) return

    if (session.status !== 'authenticated') {
      localStorage.setItem('savedCartItems', JSON.stringify(cartItems))
      return router.push('/pages/login')
    }

    await postRequest({
      url: '/api/add-order-to-db',
      body: {
        groupedCartItems,
        orderTotal,
      },
    })
  }

  if (error) {
    return (
      <Error errorMessage="There was an error processing your order.  Please try again."></Error>
    )
  }

  if (data) {
    const order = data as { id: string }
    router.push(`/pages/checkout?orderId=${order.id}`)
  }

  return (
    <article className="flexCol w-full max-w-[700px] md:rounded-3xl md:border-2 md:border-twPink px-4 md:mt-8 ">
      <div className="flex flex-col items-center justify-center p-4 pt-8">
        <Image src={cartIcon} width={75} height={75} alt="" />
        <h1 className="p-2 text-3xl text-black">Checkout</h1>
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

      <Button
        onClick={onConfirmOrder}
        isLoading={isLoading}
        text="Confirm Order"
        disabled={isLoading}
      />
    </article>
  )
}

export default Basket
