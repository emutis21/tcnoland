'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useProduct } from '@/modules/product/context/client'
import { ThemeSwitcher } from '@/theme/components/ThemeToggle'

import { SearchIcon } from '../icons/search'

import { Checkbox } from './checkbox'
import { Input } from './input'

import '@/styles/checkbox.scss'

const WAIT_BETWEEN_CHANGES = 500

export function AsideComponent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [state] = useProduct()

  const { products } = state

  const brands = useMemo(() => Array.from(new Set(products.map(({ brand }) => brand))), [products])

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (params.has('brand')) {
      document
        .querySelectorAll<HTMLInputElement>('input[type=checkbox]')
        .forEach((input) => (input.checked = false))
      params.delete('brand')
    }

    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, WAIT_BETWEEN_CHANGES)

  const handleBrand = (value: string | null, checked: boolean) => {
    const params = new URLSearchParams(searchParams)

    if (params.has('query')) {
      document.querySelector<HTMLInputElement>('input[type=search]')!.value = ''
      params.delete('query')
    }

    if (value === 'all') {
      params.delete('brand')
    } else if (checked && value !== null) {
      params.append('brand', value)
    } else {
      if (value !== null) {
        const brands = params.getAll('brand')
        const index = brands.indexOf(value)

        if (index !== -1) {
          brands.splice(index, 1)
          params.delete('brand')
          brands.forEach((brand) => params.append('brand', brand))
        }
      }
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const isAllChecked = useMemo(() => {
    const brands = searchParams.getAll('brand')

    return brands.length === 0
  }, [searchParams])

  return (
    <aside
      className='sticky top-2 mb-2 flex h-[calc(100vh-16px)] flex-col rounded-lg p-4 [grid-column:breakout-start]'
      data-type='aside'
      id='filters'
    >
      <div className='bg-background z-10 flex items-center justify-between gap-4' id='filters'>
        <div className='relative flex w-full items-center'>
          <SearchIcon className='absolute left-3 h-4 w-4 text-breakerbay-700 opacity-40 dark:text-sky-100' />
          <Input
            className='w-full pl-8'
            defaultValue={searchParams.get('query')?.toString()}
            placeholder='Samsung...'
            type='search'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='mb-4 mt-3 flex flex-1 flex-col gap-5'>
        <h2 className='ml-2 text-xl font-semibold'>Marcas</h2>
        <ul className='group w-full space-y-2 text-breakerbay-900 dark:text-breakerbay-50'>
          <li className={isAllChecked ? 'pointer-events-none opacity-50' : ''}>
            <Checkbox
              checked={isAllChecked}
              disabled={isAllChecked}
              name='all'
              onChange={handleBrand}
            >
              Todos
            </Checkbox>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <Checkbox
                checked={searchParams.getAll('brand').includes(brand)}
                name={brand}
                onChange={handleBrand}
              >
                {brand}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
      <ThemeSwitcher />
    </aside>
  )
}
