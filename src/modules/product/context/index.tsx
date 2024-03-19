import type { Product } from '../types'

import storeApi from '~/store/api'

import api from '../api'

import { ProductProviderClient } from './client'

const ProductProvider = async ({ children }: { children: React.ReactNode }) => {
  const products: Product[] = await api.list()
  const store = await storeApi.fetch()

  return (
    <ProductProviderClient products={products} store={store}>
      {children}
    </ProductProviderClient>
  )
}

export default ProductProvider
