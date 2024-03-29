import type { Cart, CartItem } from '~/cart/types'

import { parseCurrency } from '~/currency/utils'
import { getCartItemPrice } from '~/cart/utils'

import { MinusIcon } from '@/components/icons/minus'
import { AddIcon } from '@/components/icons/add'

function Details({
  cart,
  onChange
}: {
  cart: Cart
  onChange: (id: number, item: CartItem) => void
}) {
  return (
    <div className='-mr-3 flex flex-1 flex-col gap-10 divide-y divide-breakerbay-50/60 overflow-y-auto [scrollbar-color:_#0099ff90_var(--color)] [scrollbar-width:_thin] md:pr-[3px]'>
      {Array.from(cart.entries()).map(([id, item]) => (
        <div
          key={id.toString()}
          className='flex flex-col gap-4 pt-2 text-breakerbay-50'
          data-testid={`cart-item-${item.id}`}
        >
          <div className='flex h-fit items-start justify-between'>
            <h3 className='text-lg font-medium'>{item.model}</h3>

            <p className='pr-2 font-medium'>{parseCurrency(getCartItemPrice(item))}</p>
          </div>

          <div className='flex items-center gap-2'>
            <button
              aria-label='Decrementar cantidad'
              className='text-md transitions-all h-6 w-6 rounded-full p-0.5 text-center text-sky-500 duration-150 hover:text-sky-300 active:scale-90'
              type='button'
              onClick={() => {
                onChange(id, { ...item, quantity: item.quantity - 1 })
              }}
            >
              <MinusIcon size={22} />
            </button>
            <p className='min-w-[24px] text-center font-medium' data-testid='quantity'>
              {item.quantity}
            </p>
            <button
              aria-label='Incrementar cantidad'
              className='text-md transitions-all h-6 w-6 rounded-full p-0.5 text-center text-sky-500 duration-150 hover:text-sky-300 active:scale-90'
              data-testid='increment'
              type='button'
              onClick={() => {
                onChange(id, { ...item, quantity: item.quantity + 1 })
              }}
            >
              <AddIcon size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Details
