// import storeApi from '~/store/api'

// import cartApi from '../api'

// import ProductProviderClient from './client'

// const ProductProvider = async ({ children }: { children: React.ReactNode }) => {
//   const fields = await cartApi.list()
//   const store = await storeApi.fetch()

//   return (
//     <ProductProviderClient fields={fields} store={store}>
//       {children}
//     </ProductProviderClient>
//   )
// }

// export default ProductProvider

// 'use client'

// import type { Product as IProduct } from '../types'

// import { useState, useMemo, useCallback, useContext, createContext } from 'react'

// import api from '../api'

// interface Context {
//   state: {
//     products: IProduct[]
//   }
//   actions: {
//     fetchProducts: () => void
//   }
// }

// const ProductContext = createContext({} as Context)

// function ProductProviderClient({ children }: { children: React.ReactNode }) {
//   const [products, setProducts] = useState<IProduct[]>([])

//   const fetchProducts = useCallback(async () => {
//     const data: IProduct[] = await api.list()

//     setProducts(data)
//   }, [])

//   const state = useMemo(() => ({ products }), [products])
//   const actions = useMemo(() => ({ fetchProducts }), [fetchProducts])

//   return <ProductContext.Provider value={{ state, actions }}>{children}</ProductContext.Provider>
// }

// export function useProduct(): [Context['state'], Context['actions']] {
//   const { state, actions } = useContext(ProductContext)

//   return [state, actions]
// }

// export default ProductProviderClient

import api from '../api'
import storeApi from '~/store/api'
import ProductProviderClient from './client'
import { Product } from '../types'

const ProductProvider = async ({ children }: { children: React.ReactNode }) => {
  const products: Product[] = await api.list()
  const store = await storeApi.fetch()

  return <ProductProviderClient products={products} store={store}>{children}</ProductProviderClient>
}

export default ProductProvider
