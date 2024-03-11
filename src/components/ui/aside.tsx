'use client'

import { useMemo, useState } from 'react'
import { SearchIcon } from '../icons/search'
import { Input } from './input'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import api from '@/modules/product/api'
import { useProduct } from '@/modules/product/context/client'
import { RadioField } from './radioGruop'
import { Checkbox } from './checkbox'

const WAIT_BETWEEN_CHANGES = 500

export const AsideComponent = () => {
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
    let params = new URLSearchParams(searchParams)

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
        let brands = params.getAll('brand')
        let index = brands.indexOf(value)

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
      className='sticky top-2 mb-2 h-[calc(100vh-16px)] rounded-lg bg-slate-800 p-4 [grid-column:breakout-start]'
      data-type='aside'
      id='filters'
    >
      <div
        className='bg-background sticky top-0 z-10 flex items-center justify-between gap-4'
        id='filters'
      >
        <div className='relative flex w-full items-center'>
          <SearchIcon className='absolute left-3 h-4 w-4 opacity-40' />
          <Input
            className='w-full pl-8'
            placeholder='Samsung...'
            type='search'
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className='mt-3 flex flex-col gap-5'>
        <h2 className='ml-2 text-xl font-semibold'>Marcas</h2>
        <ul className='group w-full space-y-2 text-breakerbay-50'>
          <li className={isAllChecked ? 'pointer-events-none opacity-50' : ''}>
            <Checkbox
              name='all'
              disabled={isAllChecked}
              onChange={handleBrand}
              checked={isAllChecked}
            >
              Todos
            </Checkbox>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <Checkbox
                name={brand}
                checked={searchParams.getAll('brand').includes(brand)}
                onChange={handleBrand}
              >
                {brand}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
