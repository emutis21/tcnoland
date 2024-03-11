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
import { SearchIcon } from '@/components/icons/search'
import { Input } from '@/components/ui/input'
import { AsideComponent } from '@/components/ui/aside'

function StoreScreen({
  query,
  brand,
  products
}: {
  query?: string
  brand?: string
  products: Product[]
}) {
  const [state, { addItem }] = useCart()
  const [openModalId, setOpenModalId] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<Product['brand'] | null>(null)
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

  function handleSelectCategory(category: Product['brand']) {
    setSelectedCategory((currentSelectedCategory) =>
      currentSelectedCategory === category ? null : category
    )

    // queueMicrotask(() => {
    //   const categoryElement = document.getElementById(category)!
    //   const filtersElement = document.getElementById('filters')!
    //   const offset = filtersElement.getBoundingClientRect().height
    //   const bodyRect = document.body.getBoundingClientRect().top
    //   const elementRect = categoryElement.getBoundingClientRect().top
    //   const elementPosition = elementRect - bodyRect
    //   const offsetPosition = elementPosition - offset

    //   window.scrollTo({
    //     top: offsetPosition
    //   })
    // })
  }

  const filteredProducts = useMemo(() => {
    let result = products

    if (query) {
      result = result.filter(({ model }) =>
        [model].some((field) => field.toLowerCase().includes(query.toLowerCase()))
      )
    }

    if (brand) {
      if (Array.isArray(brand)) {
        result = result.filter((product) => brand.includes(product.brand))
      } else {
        result = result.filter((product) => product.brand === brand)
      }
    }
    return result
  }, [products, query])

  return (
    <>
      <main className='grid h-fit w-full gap-8 [grid-template-columns:_1fr]'>
        {filteredProducts.length !== 0 ? (
          <ul className='product__grid gap-x-14 gap-y-12 lg:gap-x-12'>
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className='product max-w-[380px] cursor-pointer'
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
        ) : (
          <div className='flex bg-violelt-800 py-4 h-screen items-start justify-start'>
            <p className='text-2xl font-semibold'>No se encontraron productos</p>
          </div>
        )}

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
