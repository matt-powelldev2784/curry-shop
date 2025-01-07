'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export type CartItem = {
  id: number
  name: string
  quantity: number
  price: number
}

type CartContextType = {
  cartItems: CartItem[]
  setCartItems: Dispatch<SetStateAction<CartItem[]>>
}

type CartProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
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
