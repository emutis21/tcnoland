import type { CartItem } from '../types'

import { useMemo } from 'react'

import { parseCurrency } from '~/currency/utils'

import { Button } from '@/components/ui/button'

import { getCartItemPrice } from '../utils'

function CartItemDrawer({
  item,
  // onClose,
  onSubmit
  // ...props
}: {
  item: CartItem
  onClose: VoidFunction
  onSubmit: (item: CartItem) => void
}) {
  const formData = useMemo(() => ({ ...item, options: {} }), [item])
  const total = useMemo(() => parseCurrency(getCartItemPrice(formData)), [formData])

  const { brand, image, model, processor, screen } = item

  return (
    <>
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

      <footer className='flex w-full flex-col gap-4 self-end border-t-2 border-t-breakerbay-500'>
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
    </>
  )
}

export default CartItemDrawer
