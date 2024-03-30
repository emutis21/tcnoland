import type { Cart, CartItem, Checkout } from './types'

import { parseCurrency } from '~/currency/utils'

export function getCartItemPrice(item: CartItem): number {
  const optionsPrice = 0

  return (optionsPrice + item.price) * item.quantity
}

export function getCartTotal(cart: Cart): number {
  return Array.from(cart.values()).reduce((total, item) => total + getCartItemPrice(item), 0)
}

export function getCartMessage(cart: Cart, checkout: Checkout): string {
  const cartItems = Array.from(cart.values())

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  const items = Array.from(cart.values())
    .map(
      (item) =>
        `* *${item.model}${item.quantity > 1 ? ` (X${item.quantity})` : ''}:* ${parseCurrency(getCartItemPrice(item))}`
    )
    .join('\n')

  const fields = Array.from(checkout.entries())
    .map(([key, value]) => `*${key}:* ${value}`)
    .join('\n')

  const total = `*Total:* ${parseCurrency(getCartTotal(cart))}`
  const interest =
    totalQuantity > 1
      ? 'Estoy interesado en los siguientes productos:'
      : 'Estoy interesado en el siguiente producto:'

  return `*¡Hola!*\n${interest}\n\n${items}\n\n${fields}\n\n${total}\n\n¡Muchas gracias!`
}
