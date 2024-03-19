'use client'

import type { Store } from '~/store/types'

import type { Product as IProduct } from '../types'

import { useState, useMemo, useCallback, useContext, createContext } from 'react'

interface Context {
  state: {
    products: IProduct[]
  }
  actions: {
    fetchProducts: () => void
  }
}

const ProductContext = createContext({} as Context)

export function ProductProviderClient({
  products,
  children
  // store
}: {
  products: IProduct[]
  children: React.ReactNode
  store: Store
}) {
  const [state, setState] = useState<IProduct[]>(products)

  const fetchProducts = useCallback(() => {
    setState(products)
  }, [products])

  const actions = useMemo(() => ({ fetchProducts }), [fetchProducts])

  return (
    <ProductContext.Provider value={{ state: { products: state }, actions }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct(): [Context['state'], Context['actions']] {
  const { state, actions } = useContext(ProductContext)

  return [state, actions]
}
