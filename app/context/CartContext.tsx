'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

export type CartItem = {
  id: string
  name: string
  quantity: number
  price: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
}

type CartProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  console.log('cartItems', cartItems)

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item])
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used inside the CartProvider')
  }
  return context
}
