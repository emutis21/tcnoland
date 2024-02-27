'use client'

import type { Product } from '~/product/types'

import { useMemo, useState } from 'react'

import { useCart } from '~/cart/context/client'
import ProductCard from '~/product/components/ProductCard'

function StoreScreen({ products }: { products: Product[] }) {
  const [state, { addItem }] = useCart()
  const [query, setQuery] = useState<string>('')
  const [layout, setLayout] = useState<'list' | 'grid'>(() =>
    products.length > 30 ? 'list' : 'grid'
  )
  console.log('state', state)
  const [selectedCategory, setSelectedCategory] = useState<Product['model'] | null>(null)
  const categories = useMemo<[Product['screen'], Product[]][]>(() => {
    let draft = products

    // Filter products by search query
    if (query) {
      draft = draft.filter(({ brand, processor }) =>
        [brand, processor].some((field) => field.toLowerCase().includes(query.toLowerCase()))
      )
    }

    // Group products by category
    const groups = draft.reduce<Map<Product['screen'], Product[]>>((map, product) => {
      if (!map.has(product.screen)) {
        map.set(product.screen, [])
      }

      map.get(product.screen)!.push(product)
      return map
    }, new Map())

    // Return them in a tuple of [category, products]
    return Array.from(groups.entries())
  }, [query, products])

  function handleSelectCategory(category: Product['model']) {
    setSelectedCategory((currentSelectedCategory) =>
      currentSelectedCategory === category ? null : category
    )

    // Scroll to the category
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
    <main className='grid gap-8 px-6 [grid-template-columns:_1fr_280px]'>
      <section className=''>
        <ul className='product__grid gap-x-14 gap-y-12 lg:gap-x-12'>
          {products.map((product) => (
            <>
              <ProductCard
                product={product}
                onAdd={(item: Product) => {
                  addItem(Date.now(), { ...item, quantity: 1 })
                }}
              />
            </>
          ))}
        </ul>
      </section>
      <aside className='rounded-lg bg-breakerbay-800 p-4'>hola</aside>
    </main>
  )
}

export default StoreScreen
