import type { Store } from '~/store/types'

import type { CartItem, Field } from '../../types'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { WhatsappIcon } from '@/components/icons/whatsapp'

import { useCart } from '../../context/client'

import Details from './Details'
import Fields from './Fields'

function CartDrawer({
  onClose,
  store,
  fields,
  ...props
}: {
  onClose: () => void
  store: Store
  fields: Field[]
}) {
  const [{ total, message, cart, checkout }, { removeItem, updateItem, updateField }] = useCart()
  const [currentStep, setCurrentStep] = useState<'details' | 'fields'>('details')

  function handleUpdateCart(id: number, item: CartItem) {
    if (!item.quantity) {
      removeItem(id)

      return
    }

    updateItem(id, item)
  }

  function handleUpdateField(id: string, value: string) {
    updateField(id, value)
  }

  useEffect(() => {
    if (!cart.size) {
      onClose()
    }
  }, [cart.size, onClose])

  return (
    <>
      {currentStep === 'details' && <Details cart={cart} onChange={handleUpdateCart} />}

      {fields && currentStep === 'fields' ? (
        <Fields checkout={checkout} fields={fields} onChange={handleUpdateField} />
      ) : null}

      <footer className='flex w-full flex-col justify-between gap-4 self-end border-t border-breakerbay-500/60 pt-4'>
        {fields && currentStep === 'details' ? (
          <>
            <div className='flex items-center justify-between gap-2 text-lg font-medium'>
              <p>Total</p>
              <p>{total}</p>
            </div>
            <Button
              className='w-full'
              data-testid='continue-order'
              size='lg'
              variant='primary'
              onClick={() => {
                setCurrentStep('fields')
              }}
            >
              Continuar
            </Button>
          </>
        ) : null}

        {/* // TODO:arreglar el componen fields */}

        {(currentStep === 'fields' || !fields) && (
          <div className='flex w-full flex-col gap-4'>
            <Button
              className='w-full'
              size='lg'
              variant='tertiary'
              onClick={() => {
                setCurrentStep('details')
              }}
            >
              Revisar pedido
            </Button>
            <a
              className='w-full'
              href={`https://wa.me/${store.phone}?text=${encodeURIComponent(message)}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <Button className='w-full' data-testid='complete-order' size='lg' variant='primary'>
                <div className='inline-flex items-center gap-2'>
                  <WhatsappIcon />
                  <span>Completar pedido</span>
                </div>
              </Button>
            </a>
          </div>
        )}
      </footer>
    </>
  )
}

export default CartDrawer
