'use client'

import React from 'react'
import { useCartContext } from '@/app/context/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MobileBasketFooter = () => {
  const router = useRouter()
  const session = useSession()

  const { groupedCartItems, orderTotal, cartItems } = useCartContext()

  const onConfirmOrder = async () => {
    if (!groupedCartItems.length) return

    if (session.status !== 'authenticated') {
      localStorage.setItem('savedCartItems', JSON.stringify(cartItems))
      return router.push('/pages/login')
    }

    return router.push('/pages/basket')
  }

  return (
    <div className="fixed bottom-0 flex flex-row justify-between z-20 w-screen gap-2 bg-twDarkGrey px-3 py-2 text-twWhite lg:hidden">
      <p className="w-20 bg-twPink text-center md:mx-4 font-bold flexRow">
        {cartItems.length}
      </p>
      <p onClick={onConfirmOrder} className="bg-twPink p-2 font-bold">
        Checkout
      </p>
      <p className="bg-twPink p-2 md:mx-4 font-bold w-20 flexRow">
        {orderTotal.toLocaleString('en-GB', {
          style: 'currency',
          currency: 'GBP',
        })}
      </p>
    </div>
  )
}

export default MobileBasketFooter
