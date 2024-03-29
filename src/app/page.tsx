import api from '~/product/api'
import apiStore from '~/store/api'

import { Navbar } from '@/components/ui/Navbar/Navbar'
import { AsideComponent } from '@/components/ui/aside'
import StoreScreen from '@/modules/store/screens/Store'
import InstagramIcon from '@/components/icons/instagram'
import { WhatsappIcon } from '@/components/icons/whatsapp'

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

      <div className='relative'>
        <div className='absolute -top-7 left-0 flex -translate-y-1/2 transform gap-2'>
          {store.instagram ? (
            <a
              aria-label='Instagram'
              href={store.instagram}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-white'>
                <InstagramIcon />
              </div>
            </a>
          ) : null}
          {store.whatsapp ? (
            <a
              aria-label='Whatsapp'
              href={store.whatsapp}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-white'>
                <WhatsappIcon />
              </div>
            </a>
          ) : null}
        </div>
      </div>

      <AsideComponent />
      <StoreScreen brand={brand} products={products} query={query} />
    </>
  )
}
