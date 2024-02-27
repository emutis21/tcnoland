'use client'

import type { CartItem } from '~/cart/types'

import type { Product } from '../types'

import { useState, useMemo } from 'react'

import CartItemDrawer from '~/cart/components/CartItemDrawer'
import { parseCurrency } from '~/currency/utils'
import { Button } from '@/components/ui/button'

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cartItem = useMemo<CartItem>(() => ({ ...product, quantity: 1 }), [product])

  const { id, image, model, price, processor } = product

  console.clear()

  // const cardsContainer = document.querySelector('.cards')
  // const cardsContainerInner = document.querySelector('.cards__inner')
  // const cards = Array.from(document.querySelectorAll('.card'))
  // const overlay = document.querySelector('.overlay')

  // const applyOverlayMask = (e) => {
  //   const overlayEl = e.currentTarget
  //   const x = e.pageX - cardsContainer.offsetLeft
  //   const y = e.pageY - cardsContainer.offsetTop

  //   overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`
  // }

  // const createOverlayCta = (overlayCard, ctaEl) => {
  //   const overlayCta = document.createElement('div')
  //   overlayCta.classList.add('cta')
  //   overlayCta.textContent = ctaEl.textContent
  //   overlayCta.setAttribute('aria-hidden', true)
  //   overlayCard.append(overlayCta)
  // }

  // const observer = new ResizeObserver((entries) => {
  //   entries.forEach((entry) => {
  //     const cardIndex = cards.indexOf(entry.target)
  //     let width = entry.borderBoxSize[0].inlineSize
  //     let height = entry.borderBoxSize[0].blockSize

  //     if (cardIndex >= 0) {
  //       overlay.children[cardIndex].style.width = `${width}px`
  //       overlay.children[cardIndex].style.height = `${height}px`
  //     }
  //   })
  // })

  // const initOverlayCard = (cardEl) => {
  //   const overlayCard = document.createElement('div')
  //   overlayCard.classList.add('card')
  //   createOverlayCta(overlayCard, cardEl.lastElementChild)
  //   overlay.append(overlayCard)
  //   observer.observe(cardEl)
  // }

  // cards.forEach(initOverlayCard)
  // document.body.addEventListener('pointermove', applyOverlayMask)

  return (
    <>
      <li
        key={id}
        className='product cursor-pointer'
        data-testid='product'
        data-featured='true'
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
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
        <div>
          <h3 className='product__title m-4 block text-2xl font-bold'>{model}</h3>
          <p className='product__description m-4 block text-sm text-white'>
            {processor}
          </p>
        </div>
        <footer className='flex items-end justify-between gap-4 px-4 pb-4'>
          <p className='product__price text-basis font-light text-breakerbay-800 dark:text-breakerbay-200'>
            Desde <span className='block text-lg font-black'>{parseCurrency(price)}</span>
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            size='sm'
            variant='primary'
            className='product__button'
          >
            Add to cart
          </Button>
        </footer>
      </li>
      {isModalOpen ? (
        <CartItemDrawer
          // open
          item={cartItem}
          onClose={() => {
            setIsModalOpen(false)
          }}
          onSubmit={(item: CartItem) => {
            onAdd(item)
            setIsModalOpen(false)
          }}
        />
      ) : null}
    </>
  )
}

export default ProductCard
