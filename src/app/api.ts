import type { Product as IProduct, Results } from './types'
import { notFound } from 'next/navigation'

import Papa from 'papaparse'

const api = {
  list: async (): Promise<IProduct[]> => {
    return fetch(process.env.PRODUCTS!, { next: { tags: ['products'] } }).then(async (response) => {
      const csv: string = await response.text()

      return new Promise<IProduct[]>((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (results: Papa.ParseResult<Results>) => {
            const data = results.data as unknown as IProduct[]

            return resolve(data)
          },
          error: (error: Error) => reject(error.message)
        })
      })
    })
  },
  fetch: async (id: IProduct['id']): Promise<IProduct> => {
    const products = await api.list()
    const product = products.find((product) => product.id === id)

    if (!product) return notFound()

    return product
  }
}

export default api
