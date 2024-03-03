'use client'

import type { CartItem } from '~/cart/types'

import type { Product } from '../types'

import { useState, useMemo, useEffect } from 'react'

import CartItemDrawer from '~/cart/components/CartItemDrawer'
import { parseCurrency } from '~/currency/utils'
import { Button } from '@/components/ui/button'
import { useCart } from '@/modules/cart/context/client'

function ProductCard({
  product,
  onAdd,
  setOpenModalId
}: {
  product: Product
  onAdd: (product: Product) => void
  setOpenModalId?: (id: string | null) => void
}) {
  const cartItem = useMemo<CartItem>(() => ({ ...product, quantity: 1 }), [product])

  const { image, model, price, processor } = product

  return (
    <>
      {product.image ? (
        <figcaption className='overflow-hidden'>
          <img
            alt={model}
            className='aspect-[9/16] h-56 w-full transform object-cover transition-all duration-300 ease-in-out'
            loading='lazy'
            src={image}
          />
        </figcaption>
      ) : (
        <div className='flex h-32 items-center justify-center bg-slate-950'>
          <p className='text-white'>Aún no tenemos la imagen</p>
        </div>
      )}
      <div className='flex flex-col justify-between'>
        <h3 className='product__title m-4 line-clamp-3 block text-2xl font-bold'>{model}</h3>
        <p className='product__description m-4 block text-sm text-breakerbay-800 dark:text-breakerbay-200'>
          {processor}
        </p>
      </div>
      <footer className='flex items-end justify-between gap-4 px-4 pb-4'>
        <p className='product__price text-basis font-light text-breakerbay-800 dark:text-breakerbay-200'>
          Desde <span className='block text-sm font-black'>{parseCurrency(price)}</span>
        </p>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            e.preventDefault()
            onAdd(product)
          }}
          size='sm'
          variant='primary'
          className='product__button'
        >
          Add to cart
        </Button>
      </footer>
    </>
  )
}

export default ProductCard
