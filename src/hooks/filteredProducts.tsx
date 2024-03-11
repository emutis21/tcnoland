import { useMemo } from 'react'
import { Product } from '@/modules/product/types'

const useFilteredProducts = (products: Product[], query: string, brands: string[]) => {
  return useMemo(() => {
    let result = products

    if (query) {
      result = result.filter((product) => product.model.toLowerCase().includes(query.toLowerCase()))
    }

    if (brands.length > 0) {
      result = result.filter((product) => brands.includes(product.brand))
    }

    return result
  }, [products, query, brands])
}

export default useFilteredProducts
