import { Navbar } from '@/components/ui/Navbar/Navbar'
import StoreScreen from '@/modules/store/screens/Store'
import { AsideComponent } from '@/components/ui/aside'

import api from '../modules/product/api'

export default async function Home({ searchParams }: { searchParams?: { query: string, brand: string } }) {
  const products = await api.list()
  const query = searchParams?.query ?? ''
  const brand = searchParams?.brand ?? ''

  return (
    <>
      <Navbar />
      <h1 className='mb-8 text-center font-semibold [grid-column:breakout]'>Store</h1>

      <AsideComponent />
      <StoreScreen brand={brand}  products={products} query={query} />
    </>
  )
}
