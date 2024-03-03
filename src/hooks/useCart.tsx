'use client'

import { Cart } from '@/modules/cart/types'
import { useState, useEffect } from 'react'

export default function useLocalStorageCart(): [Cart, (cart: Cart) => void] {
  const [cart, setCart] = useState<Cart>(new Map())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      setCart(storedCart ? new Map(JSON.parse(storedCart)) : new Map())
    }
  }, [])

  const setLocalStorageCart = (newCart: Cart) => {
    try {
      setCart(newCart)
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(Array.from(newCart.entries())))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [cart, setLocalStorageCart]
}
