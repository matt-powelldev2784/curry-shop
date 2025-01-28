'use client'

import { useCartContext } from '@/app/context/CartContext'
import { signOut } from 'next-auth/react'

const Logout = () => {
  const { cartItems } = useCartContext()
  const onSignOut = async () => {
    localStorage.setItem('savedCartItems', JSON.stringify(cartItems))
    await signOut({ redirectTo: '/pages/foodmenu' })
  }

  return (
    <div className="flex flex-col items-center">
      <p>Logout Page</p>

      <button className="p-2 bg-red-500" onClick={onSignOut} type="submit">
        Sign out
      </button>
    </div>
  )
}

export default Logout
