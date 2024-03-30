import api from '~/product/api'
import apiStore from '~/store/api'
import StoreScreen from '~/store/screens/Store'

import { Navbar } from '@/components/ui/Navbar/Navbar'
import { AsideComponent } from '@/components/ui/aside'
import { SocialMedia } from '@/components/ui/socialMedia'

export default async function Home({
  searchParams
}: {
  searchParams?: { query: string; brand: string }
}) {
  const products = await api.list()
  const store = await apiStore.fetch()

  const query = searchParams?.query ?? ''
  const brand = searchParams?.brand ?? ''

  return (
    <>
      <Navbar />

      <h1 className='mb-8 h-fit text-center font-semibold [grid-column:breakout]'>Store</h1>

      <SocialMedia store={store} />
      <div className='[grid-column:breakout-start]'>
        <AsideComponent />
      </div>
      <StoreScreen brand={brand} products={products} query={query} />
    </>
  )
}
