export interface Product {
  id: string
  type: string
  brand: string
  model: string
  processor: string
  screen: string
  image: string
  price: number
}

export interface Meta {
  delimiter: string
  linebreak: string
  aborted: boolean
  truncated: boolean
  cursor: number
  fields: string[]
}

export interface Results {
  data: Product[]
  errors: string[]
  meta: Meta
}
