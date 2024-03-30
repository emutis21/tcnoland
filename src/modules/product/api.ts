import type { Option as IOption, Product as IProduct, Results } from './types'

import { notFound } from 'next/navigation'
import Papa from 'papaparse'

interface RawOption extends IOption {
  type: 'option'
}

interface RawProduct extends IProduct {
  type: 'product'
}

interface RawUnknown extends IProduct {
  type: string
}

class Product implements IProduct {
  id: string
  type: string
  brand: string
  model: string
  processor: string
  screen: string
  image: string
  price: number

  constructor() {
    this.id = ''
    this.type = ''
    this.brand = ''
    this.model = ''
    this.processor = ''
    this.screen = ''
    this.image = ''
    this.price = 0
  }

  set(product: RawProduct) {
    Object.assign(this, {
      id: product.id,
      type: product.type,
      brand: product.brand,
      model: product.model,
      processor: product.processor,
      screen: product.screen,
      image: product.image,
      price: product.price
    })
  }

  toJSON(): IProduct {
    const product = {
      id: this.id,
      type: this.type,
      brand: this.brand,
      model: this.model,
      processor: this.processor,
      screen: this.screen,
      image: this.image,
      price: Number(this.price)
    }

    return product
  }
}

function normalize(data: (RawProduct | RawOption | RawUnknown)[]) {
  const products = new Map<RawProduct['id'], Product>()

  for (const item of data) {
    if (item.type === 'product') {
      const baseProduct = new Product()

      baseProduct.set(item as RawProduct)

      products.set(baseProduct.id, baseProduct)

      continue
    }
  }

  const normalized: IProduct[] = Object.values(Object.fromEntries(products)).map((product) =>
    product.toJSON()
  )

  return normalized
}

const api = {
  list: async (): Promise<IProduct[]> => {
    const { signal: abortController } = new AbortController()

    return fetch(process.env.PRODUCTS!, {
      signal: abortController,
      next: { tags: ['products'] }
    }).then(async (response) => {
      const csv: string = await response.text()

      return new Promise<IProduct[]>((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
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
  },
  mock: {
    list: (mock: string): Promise<IProduct[]> =>
      import(`./mocks/${mock}.json`).then((result: { default: (RawProduct | RawOption)[] }) =>
        normalize(result.default)
      )
  }
}

export default api
