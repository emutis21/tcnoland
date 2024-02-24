import api from './api'

export default async function Home() {
  const products = await api.list()
  return (
    <main
      // data-type='card'
      className='flex flex-col items-center justify-between [grid-column:full-width]'
    >
      <ul className='grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((products) => (
          <li
            key={products.id}
            className='flex flex-col items-center justify-between rounded-lg px-4 py-2'
            data-type='card'
          >
            <h2>
              {products.brand} {products.model}
            </h2>
            <p>{products.processor}</p>
            <p>{products.screen}</p>
            <img
              src={products.image}
              alt={products.brand}
              className='aspect-[14/16] w-64 rounded-lg object-cover'
            />
            <p>{products.price}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
