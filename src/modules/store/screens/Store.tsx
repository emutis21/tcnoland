'use client'

import type { Product } from '~/product/types'
import { type CartItem } from '~/cart/types'

import { useEffect, useMemo, useState } from 'react'

import { useCart } from '~/cart/context/client'
import CartItemDrawer from '~/cart/components/CartItemDrawer'
import ProductCard from '~/product/components/ProductCard'

import { GridLayoutIcon } from '@/components/icons/grid'
import { ListLayoutIcon } from '@/components/icons/list'
import { LoaderComponent } from '@/components/ui/loader'
import { SideCart } from '@/components/ui/sideCart'

import '@/styles/products.scss'

function StoreScreen({
  query,
  brand,
  products
}: {
  query?: string
  brand?: string
  products: Product[]
}) {
  const [, { addItem }] = useCart()

  const [layout, setLayout] = useState<'gridLayout' | 'listLayout'>('gridLayout')
  const [isLoading, setIsLoading] = useState(true)

  const [openModalId, setOpenModalId] = useState<string | null>(null)

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
  }, [products, query, brand])

  useEffect(() => {
    const savedLayout = localStorage.getItem('layout')

    if (savedLayout === 'gridLayout' || savedLayout === 'listLayout') {
      setLayout(savedLayout as 'gridLayout' | 'listLayout')
    }

    setIsLoading(false)
  }, [])

  function handleLayoutChange(newLayout: 'gridLayout' | 'listLayout') {
    setLayout(newLayout)
    if (typeof window !== 'undefined') {
      localStorage.setItem('layout', newLayout)
    }
  }

  return (
    <main className='relative grid h-fit min-h-[calc(100svh-20rem)] w-full gap-8 [grid-template-columns:_1fr] md:min-h-fit'>
      {isLoading ? null : (
        <div className='absolute -top-12 flex gap-3 justify-self-end'>
          <button
            className={`${layout === 'gridLayout' ? 'border border-sky-500 bg-slate-300 text-breakerbay-800 dark:bg-slate-700 dark:text-breakerbay-50' : ''} flex items-center justify-center rounded-md border border-transparent p-1 transition-colors duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
            title='Cuadrícula de productos'
            type='button'
            onClick={() => handleLayoutChange('gridLayout')}
          >
            <GridLayoutIcon />
          </button>
          <button
            className={`${layout === 'listLayout' ? 'border border-sky-500 bg-slate-300 text-breakerbay-800 dark:bg-slate-700 dark:text-breakerbay-50' : ''} flex items-center justify-center rounded-md border border-transparent p-1 transition-colors duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
            title='Listado de productos'
            type='button'
            onClick={() => handleLayoutChange('listLayout')}
          >
            <ListLayoutIcon />
          </button>
        </div>
      )}
      {filteredProducts.length !== 0 ? (
        isLoading ? (
          <div className='flex w-full items-center justify-center'>
            <LoaderComponent className='' />
          </div>
        ) : (
          <ul className={layout === 'listLayout' ? 'product__list' : 'product__grid'}>
            {filteredProducts.map((product) => {
              if (!product.model || !product.price || !product.processor) {
                return null
              }

              return (
                <li
                  key={product.id}
                  className='product cursor-pointer'
                  data-featured='true'
                  /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role */
                  role='button'
                  tabIndex={0}
                  onClick={() => {
                    setOpenModalId(product.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      setOpenModalId(product.id)
                    }
                  }}
                >
                  <ProductCard
                    product={product}
                    setOpenModalId={setOpenModalId}
                    onAdd={(item: Product) => {
                      addItem(Date.now(), { ...item, quantity: 1 })
                    }}
                  />
                </li>
              )
            })}
          </ul>
        )
      ) : (
        <div className='bg-violelt-800 flex h-screen items-start justify-start py-4'>
          <p className='text-2xl font-semibold'>No se encontraron productos</p>
        </div>
      )}

      <SideCart
        openModalId={openModalId}
        title='Agregar al carrito'
        onClose={() => setOpenModalId(null)}
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
  )
}

export default StoreScreen
