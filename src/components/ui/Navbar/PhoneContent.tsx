import { Arrow } from '@/components/icons/arrow'
import { useProduct } from '@/modules/product/context/client'
import { useMemo } from 'react'

export const PhoneContent = () => {
  const [state] = useProduct()

  const { products } = state

  const brands = useMemo(() => Array.from(new Set(products.map(({ brand }) => brand))), [products])
  return (
    <div className='flex gap-5 text-breakerbay-800 dark:text-breakerbay-100'>
      <div className='flex h-full flex-col justify-between gap-5'>
        <header className='w-64 bg-transparent font-semibold'>
          <h2 className='mb-5 text-xl font-semibold'>Celulares</h2>
          <h3 className='text-breakerbay-50'>
            <a
              href='#'
              className='flex h-full justify-between rounded-lg bg-gradient-to-br from-breakerbay-800 to-breakerbay-500 p-4
              text-3xl transition-all duration-300 ease-out hover:brightness-105
            '
            >
              <div className='flex flex-col'>
                <span>Todos los celulares</span>
                <span className='text-sm font-light'>Míralos aquí</span>
              </div>
              <Arrow className='self-center' />
            </a>
          </h3>
        </header>
        <a
          href='#'
          className='flex w-full justify-between px-4 text-sky-700 transition-all duration-300 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-500'
        >
          <span>Todos los celulares</span>
          <Arrow className='self-center' size={20} />
        </a>
      </div>
      <div className='flex w-full flex-col gap-5'>
        <h2
          className='
          text-xl font-semibold
        '
        >
          Marcas
        </h2>
        <ul className='group w-full space-y-4 px-4 font-normal text-breakerbay-950 dark:text-breakerbay-50 [&>li>a]:block [&>li>a]:border-b [&>li>a]:border-b-sky-700 [&>li>a]:py-[2px] hover:[&>li>a]:border-b-breakerbay-500 dark:[&>li>a]:border-b-breakerbay-700'>
          {brands.map((brand) => (
            <li key={brand}>
              <a href='#' className='flex justify-between'>
                {brand}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
