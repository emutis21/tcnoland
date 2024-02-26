import { Navbar } from '@/components/ui/Navbar/Navbar'
import api from '../modules/product/api'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const products = await api.list()

  const brands = new Set(products.map(({ brand }) => brand))

  // TODO: improve this, componentize it and add to cart
  return (
    <>
      <Navbar />

      <Button variant='primary' size='md'>
        Cómpralo
      </Button>
      <main
        className='flex flex-col items-center justify-between [grid-column:full-width]'
      >
        <ul className='grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3'>
          {products.map(({ id, brand, model, processor, screen, image, price }) => {
            return (
              <li
                key={id}
                className='flex flex-col items-center justify-between rounded-lg px-4 py-2'
                data-type='card'
              >
                <h2>
                  {brand} {model}
                </h2>
                <p>{processor}</p>
                <p>{screen}</p>
                <img
                  src={image}
                  alt={brand}
                  className='aspect-[14/16] w-64 rounded-lg object-cover'
                />
                <p>{price}</p>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
