// 'use client'

// import type { Store } from '~/store/types'

// import type { Cart, CartItem, Checkout, Field } from '../types'

// import { useState, useMemo, useCallback, useContext, createContext } from 'react'

// import { parseCurrency } from '~/currency/utils'

// import { Button } from '@/components/ui/button'

// import CartDrawer from '../components/CartDrawer'
// import { getCartMessage, getCartTotal } from '../utils'

// interface Context {
//   state: {
//     cart: Cart
//     checkout: Checkout
//     total: string
//     quantity: number
//     message: string
//   }
//   actions: {
//     addItem: (id: number, value: CartItem) => void
//     removeItem: (id: number) => void
//     updateItem: (id: number, value: CartItem) => void
//     updateField: (id: string, value: string) => void
//   }
// }

// const CartContext = createContext({} as Context)

// function CartProviderClient({
//   fields,
//   children,
//   store
// }: {
//   fields: Field[]
//   children: React.ReactNode
//   store: Store
// }) {
//   const [checkout, setCheckout] = useState<Checkout>(() => new Map())
//   const [cart, setCart] = useState<Cart>(() => new Map())
//   const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
//   const total = useMemo(() => parseCurrency(getCartTotal(cart)), [cart])
//   const quantity = useMemo(
//     () => Array.from(cart.values()).reduce((acc, item) => acc + item.quantity, 0),
//     [cart]
//   )
//   const message = useMemo(() => getCartMessage(cart, checkout), [cart, checkout])

//   const addItem = useCallback(
//     (id: number, value: CartItem) => {
//       cart.set(id, value)

//       setCart(new Map(cart))
//     },
//     [cart]
//   )

//   const removeItem = useCallback(
//     (id: number) => {
//       cart.delete(id)

//       setCart(new Map(cart))
//     },
//     [cart]
//   )

//   const updateItem = useCallback(
//     (id: number, value: CartItem) => {
//       cart.set(id, value)

//       setCart(new Map(cart))
//     },
//     [cart]
//   )

//   const updateField = useCallback(
//     (id: string, value: string) => {
//       checkout.set(id, value)

//       setCheckout(new Map(checkout))
//     },
//     [checkout]
//   )

//   const state = useMemo(
//     () => ({ checkout, cart, total, quantity, message }),
//     [checkout, cart, total, quantity, message]
//   )
//   const actions = useMemo(
//     () => ({ updateItem, updateField, addItem, removeItem }),
//     [updateItem, updateField, addItem, removeItem]
//   )

//   return (
//     <CartContext.Provider value={{ state, actions }}>
//       <>
//         {children}
//         {/* Cart button */}
//         {Boolean(quantity) && (
//           <div className='sticky bottom-0 flex content-center items-center pb-4 sm:m-auto'>
//             <Button
//               aria-label='Ver pedido'
//               className='m-auto w-full shadow-lg sm:w-fit'
//               data-testid='show-cart'
//               size='lg'
//               variant='primary'
//               onClick={() => {
//                 setIsCartOpen(true)
//               }}
//             >
//               <div className='flex items-center gap-4'>
//                 <div className='flex items-center gap-2'>
//                   <p className='leading-6'>Ver pedido</p>
//                   <p className='rounded-sm bg-black/25 px-2 py-1 text-xs font-semibold text-white/90'>
//                     {quantity} item
//                   </p>
//                 </div>
//                 <p className='leading-6'>{total}</p>
//               </div>
//             </Button>
//           </div>
//         )}
//         {/* Cart Drawer */}
//         {Boolean(isCartOpen) && (
//           <CartDrawer
//             fields={fields}
//             store={store}
//             onClose={() => {
//               setIsCartOpen(false)
//             }}
//           />
//         )}
//       </>
//     </CartContext.Provider>
//   )
// }

// export function useCart(): [Context['state'], Context['actions']] {
//   const { state, actions } = useContext(CartContext)

//   return [state, actions]
// }

// export default CartProviderClient
// ;[
//   {
//     id: 1,
//     type: 'phone',
//     brand: 'OnePlus',
//     model: 'OnePlus 12',
//     processor: 'Qualcomm Snapdragon 8 Gen3',
//     screen: '6.82", AMOLED, WQHD+',
//     image: 'https://cdn-files.kimovil.com/default/0009/55/thumb_854860_default_big.jpg',
//     price: 280
//   },
//   {
//     id: 2,
//     type: 'phone',
//     brand: 'Oppo',
//     model: 'Oppo Find X7',
//     processor: 'MediaTek Dimensity 9300',
//     screen: '6.78", AMOLED, FHD',
//     image: 'https://cdn-files.kimovil.com/default/0009/66/thumb_865520_default_big.jpg',
//     price: 570
//   },
//   {
//     id: 3,
//     type: 'phone',
//     brand: 'Nubia',
//     model: 'Nubia Z60 Ultra',
//     processor: 'Qualcomm Snapdragon 8 Gen3',
//     screen: '6.8", AMOLED, FHD+',
//     image: 'https://cdn-files.kimovil.com/default/0009/62/thumb_861036_default_big.jpg',
//     price: 400
//   },
//   {
//     id: 4,
//     type: 'phone',
//     brand: 'Xiaomi',
//     model: 'Xiaomi 13T Pro',
//     processor: 'MediaTek Dimensity 9200 Plus',
//     screen: '6.67", AMOLED, QHD',
//     image: 'https://cdn-files.kimovil.com/default/0009/25/thumb_824998_default_big.jpg',
//     price: 250
//   },
//   {
//     id: 5,
//     type: 'phone',
//     brand: 'OnePlus',
//     model: 'OnePlus 11',
//     processor: 'Qualcomm Snapdragon 8 Gen2',
//     screen: '6.7", AMOLED, WQHD+',
//     image: 'https://cdn-files.kimovil.com/default/0008/22/thumb_721839_default_big.jpg',
//     price: 310
//   }
// ]

// import api from '../api'
// import storeApi from '~/store/api'
// import ProductProviderClient from './client'

// const ProductProvider = async ({ children }: { children: React.ReactNode }) => {
//   const products = await api.list()
//   const store = await storeApi.fetch()

//   return <ProductProviderClient products={products}
//     store={store}
//   >{children}</ProductProviderClient>
// }

// export default ProductProvider

'use client'

import { Store } from '~/store/types'
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

const ProductProviderClient = ({
  products,
  children,
  store
}: {
  products: IProduct[]
  children: React.ReactNode
  store: Store
}) => {
  const [state, setState] = useState<IProduct[]>(products)

  const fetchProducts = useCallback(async () => {
    setState(products)
  }, [products])

  const actions = useMemo(() => ({ fetchProducts }), [fetchProducts])

  return <ProductContext.Provider value={{ state: { products: state }, actions }}>{children}</ProductContext.Provider>
}

export function useProduct(): [Context['state'], Context['actions']] {
  const { state, actions } = useContext(ProductContext)

  return [state, actions]
}

export default ProductProviderClient
