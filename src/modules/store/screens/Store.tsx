'use client'

import type { Product } from '~/product/types'

import { useEffect, useMemo, useState } from 'react'

import { useCart } from '~/cart/context/client'

import CartItemDrawer from '@/modules/cart/components/CartItemDrawer'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/modules/cart/types'
import { parseCurrency } from '@/modules/currency/utils'
import ProductCard from '@/modules/product/components/ProductCard'
import { AnimatePresence, motion } from 'framer-motion'
import { SideCart } from '@/components/ui/sideCart'

function StoreScreen({ products }: { products: Product[] }) {
  const [state, { addItem }] = useCart()
  const [openModalId, setOpenModalId] = useState<string | null>(null)

  const [query, setQuery] = useState<string>('')
  const [layout, setLayout] = useState<'list' | 'grid'>(() =>
    products.length > 30 ? 'list' : 'grid'
  )
  console.log('state', state)
  const [selectedCategory, setSelectedCategory] = useState<Product['model'] | null>(null)
  const categories = useMemo<[Product['screen'], Product[]][]>(() => {
    let draft = products

    if (query) {
      draft = draft.filter(({ brand, processor }) =>
        [brand, processor].some((field) => field.toLowerCase().includes(query.toLowerCase()))
      )
    }

    const groups = draft.reduce<Map<Product['screen'], Product[]>>((map, product) => {
      if (!map.has(product.screen)) {
        map.set(product.screen, [])
      }

      map.get(product.screen)!.push(product)
      return map
    }, new Map())

    return Array.from(groups.entries())
  }, [query, products])

  function handleSelectCategory(category: Product['model']) {
    setSelectedCategory((currentSelectedCategory) =>
      currentSelectedCategory === category ? null : category
    )

    queueMicrotask(() => {
      const categoryElement = document.getElementById(category)!
      const filtersElement = document.getElementById('filters')!
      const offset = filtersElement.getBoundingClientRect().height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = categoryElement.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition
      })
    })
  }

  return (
    <>
      <aside className='sticky top-2 mb-2 h-[calc(100vh-16px)] rounded-lg bg-breakerbay-800 p-4 [grid-column:breakout-start]'>
        hola
      </aside>
      <main className='grid h-fit w-full gap-8 pl-6 [grid-column:content-start/breakout-end] [grid-template-columns:_1fr]'>
        <ul className='product__grid gap-x-14 gap-y-12 lg:gap-x-12'>
          {products.map((product) => (
            <li
              key={product.id}
              className='product cursor-pointer'
              data-testid='product'
              data-featured='true'
              onClick={() => {
                if (setOpenModalId) setOpenModalId(product.id)
              }}
            >
              <ProductCard
                product={product}
                onAdd={(item: Product) => {
                  addItem(Date.now(), { ...item, quantity: 1 })
                }}
                setOpenModalId={setOpenModalId}
              />
            </li>
          ))}
        </ul>

        <SideCart
          openModalId={openModalId}
          onClose={() => setOpenModalId(null)}
          title='Agregar al carrito'
        >
          <CartItemDrawer
            item={{ ...products.find((product) => product.id === openModalId)!, quantity: 1 }}
            onClose={() => {
              setOpenModalId(null)
            }}
            onSubmit={(item: CartItem) => {
              addItem(Date.now(), { ...item, quantity: 1 })
              setOpenModalId(null)
            }}
          />
        </SideCart>
      </main>
    </>
  )
}

export default StoreScreen
