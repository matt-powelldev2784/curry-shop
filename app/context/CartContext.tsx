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
  id: string
  name: string
  quantity: number
  price: number
  imageUrl: string
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  groupedCartItems: CartItem[]
  orderTotal: number
  resetBasket: Dispatch<SetStateAction<CartItem[]>>
}

type CartProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item])
  }

  const removeFromCart = (id: string) => {
    const index = cartItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      setCartItems((prevItems) => [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ])
    }
  }

  // grouped cart items is a list of cart items with a quantity
  // if a cart item is added multiple times, it will list a single item
  // with the quantity listed for it
  const groupedCartItems = cartItems.reduce((acc, item) => {
    // Check if the item already exists in the accumulator
    // If the item exists, update its quantity
    // If the item does not exist, add it to the accumulator
    const existingItem = acc.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      return acc.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      )
    } else {
      return [...acc, { ...item }]
    }
  }, [] as CartItem[])

  const orderTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  const resetBasket = () => {
    setCartItems([])
  }

  const savedCartItems = localStorage.getItem('savedCartItems')
  if (savedCartItems) {
    setCartItems(JSON.parse(savedCartItems))
    localStorage.removeItem('savedCartItems')
  }

  console.log('orderTotal', orderTotal)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        groupedCartItems,
        orderTotal,
        resetBasket,
      }}
    >
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
