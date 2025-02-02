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
      const loginText = 'Please login to complete your order'
      return router.push(`/pages/login?loginReason=${loginText}`)
    }

    return router.push('/pages/basket')
  }

  return (
    <div className="fixed bottom-0 w-full z-20 bg-twPink px-3 py-2 text-twWhite lg:hidden">
      <div className="flex flex-row justify-between items-center w-[98%]">
        <div className="w-1/3">
          <p className="w-8 bg-[#951b4c] text-center font-bold rounded">
            {cartItems.length}
          </p>
        </div>

        <button
          onClick={onConfirmOrder}
          className="bg-twBlack p-2 font-bold rounded w-1/3"
        >
          Checkout
        </button>

        <div className="w-1/3">
          <p className="bg-twPink  font-bold rounded text-right">
            {orderTotal.toLocaleString('en-GB', {
              style: 'currency',
              currency: 'GBP',
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileBasketFooter
