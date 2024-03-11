import { Navbar } from '@/components/ui/Navbar/Navbar'
import { AsideComponent } from '@/components/ui/aside'
import StoreScreen from '@/modules/store/screens/Store'
import api from '../modules/product/api'

export default async function Home({ searchParams }: { searchParams?: { query: string, brand: string } }) {
  const products = await api.list()
  const query = searchParams?.query || ''
  const brand = searchParams?.brand || ''

  return (
    <>
      <Navbar />
      <h1 className='mb-8 text-center text-4xl font-semibold [grid-column:content]'>Store</h1>

      <AsideComponent />
      <StoreScreen products={products} query={query} brand={brand} />
    </>
  )
}
