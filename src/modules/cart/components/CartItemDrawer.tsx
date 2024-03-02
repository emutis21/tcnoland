import type { CartItem } from '../types'

import { useState, useMemo } from 'react'

import { parseCurrency } from '~/currency/utils'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'

import { getCartItemPrice } from '../utils'
import { AsideCart } from './AsideCart'
import { CloseIcon } from '@/components/icons/close'

function CartItemDrawer({
  item,
  onClose,
  onSubmit,
  ...props
}: {
  item: CartItem
  onClose: VoidFunction
  onSubmit: (item: CartItem) => void
}) {
  const [formData, setFormData] = useState<CartItem>(() => ({ ...item, options: {} }))
  const total = useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData])
  const options = useMemo(() => {}, [])

  const { brand, image, model, processor, screen } = item

  return (
    <aside className='flex h-full w-[450px] flex-col justify-between gap-12 divide-y-2 divide-breakerbay-500 self-end overflow-y-auto border-l-4 border-l-breakerbay-500 bg-breakerbay-500 p-8 text-breakerbay-50 dark:bg-breakerbay-950'>
      <div className='grid gap-12'>
        <header className='flex items-center justify-between'>
          <h2 className='text-3xl font-semibold'>Agregar al pedido</h2>
          <button
            onClick={() => {
              onClose()
            }}
          >
            <CloseIcon className='text-breakerbay-200 transition-colors duration-150 hover:text-white' />
          </button>
        </header>

        <div className='flex flex-col gap-2'>
          {Boolean(image) && (
            <img alt={brand} className='h-[250px] w-full bg-white object-contain' src={image} />
          )}
          <h2 className='mb-2 mt-8 text-2xl font-bold'>{model}</h2>
          <div className='space-y-2 px-3'>
            <p>{processor}</p>

            <p>{screen}</p>
          </div>
        </div>
      </div>

      <footer className='flex w-full flex-col gap-4'>
        <div className='mt-2 flex items-center justify-between text-lg font-medium'>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <Button
          className='w-full'
          size='lg'
          variant='primary'
          onClick={() => {
            onSubmit(formData)
          }}
        >
          Agregar al pedido
        </Button>
      </footer>
    </aside>
  )
}

export default CartItemDrawer
