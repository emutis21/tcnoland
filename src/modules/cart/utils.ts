import type { Cart, CartItem, Checkout } from './types'

import { parseCurrency } from '~/currency/utils'

// TODO: Revisar bien los tipos y actualizar la db para que coincida con el tipo de CartItem

export function getCartItemPrice(item: CartItem): number {
  const optionsPrice = 0

  return (optionsPrice + item.price) * item.quantity
}

export function getCartTotal(cart: Cart): number {
  return Array.from(cart.values()).reduce((total, item) => total + getCartItemPrice(item), 0)
}

export function getCartMessage(cart: Cart, checkout: Checkout): string {
  const items = Array.from(cart.values())
    .map(
      (item) =>
        `${item.model}${item.quantity > 1 ? ` (X${item.quantity})` : ''}
          - ${parseCurrency(getCartItemPrice(item))}
        `
    )
    .join('\n')

  const fields = Array.from(checkout.entries())
    .map(([key, value]) => `* ${key}: ${value}`)
    .join('\n')

  const total = `Total: ${parseCurrency(getCartTotal(cart))}`

  return [items, fields, total].join('\n\n')
}
