'use client'

import type { Product } from '../types'

import { parseCurrency } from '~/currency/utils'

import { AddIcon } from '@/components/icons/add'
import { Button } from '@/components/ui/button'

function ProductCard({
  product,
  onAdd
  // setOpenModalId
}: {
  product: Product
  onAdd: (product: Product) => void
  setOpenModalId?: (id: string | null) => void
}) {
  // const cartItem = useMemo<CartItem>(() => ({ ...product, quantity: 1 }), [product])

  const { image, model, price, processor } = product

  return (
    <>
      <button
        className='button__list text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300'
        type='button'
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation()
          e.preventDefault()
          onAdd(product)
        }}
      >
        <AddIcon className='h-6 w-6' />
      </button>
      {product.image ? (
        <figcaption className='overflow-hidden'>
          <img
            alt={model}
            className='transform object-cover transition-[scale] ease-in-out'
            decoding='async'
            src={image}
          />
        </figcaption>
      ) : (
        <div className='flex h-32 items-center justify-center bg-slate-950'>
          <p className='text-white'>Aún no tenemos la imagen</p>
        </div>
      )}
      <>
        <div className='title__content flex flex-col justify-between'>
          <h2 className='product__title line-clamp-3 block text-2xl font-bold'>{model}</h2>
          <p className='product__description m-4 block text-sm text-breakerbay-800 dark:text-breakerbay-200'>
            {processor}
          </p>
        </div>
        <footer className=''>
          <p className='product__price text-basis font-light text-breakerbay-800 dark:text-breakerbay-200'>
            Desde <span className='block text-sm font-black'>{parseCurrency(price)}</span>
          </p>
          <Button
            className='product__button'
            size='sm'
            variant='primary'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              e.preventDefault()
              onAdd(product)
            }}
          >
            Add to cart
          </Button>
        </footer>
      </>
    </>
  )
}

export default ProductCard
