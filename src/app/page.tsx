import { Navbar } from '@/components/ui/Navbar/Navbar'
import api from '../modules/product/api'
import { Button } from '@/components/ui/button'
import StoreScreen from '@/modules/store/screens/Store'

export default async function Home() {
  const products = await api.list()

  const brands = new Set(products.map(({ brand }) => brand))

  // TODO: improve this, componentize it and add to cart
  return (
    <>
      <Navbar />

      {/* <Button variant='primary' size='md'>
        Cómpralo
      </Button> */}
      <h1 className='mb-8 text-center text-4xl font-semibold'>Store</h1>

      <StoreScreen products={products} />
    </>
  )
}
