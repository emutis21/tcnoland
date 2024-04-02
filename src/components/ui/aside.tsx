'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useReducer } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { useProduct } from '~/product/context/client'

import { ThemeSwitcher } from '@/theme/components/ThemeToggle'
import { usePageVisibility } from '@/hooks/usePageVisibility'

import { SearchIcon } from '../icons/search'

import { Checkbox } from './checkbox'
import { Input } from './input'

import '@/styles/aside.scss'
import '@/styles/checkbox.scss'

const WAIT_BETWEEN_CHANGES = 500

const initialState = {}

type State = Record<string, boolean>

interface Action {
  type: string
  brand?: string | null
  newState?: State
}

const reducer = (stateCheckbox: State, action: Action): State => {
  if (action.type === 'toggle') {
    return { ...stateCheckbox, [action.brand ?? '']: !stateCheckbox[action.brand ?? ''] }
  }

  if (action.type === 'set') {
    return action.newState ?? {}
  }

  throw new Error()
}

export function AsideComponent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [state] = useProduct()
  const [stateCheckbox, dispatch] = useReducer(reducer, initialState)
  const isVisible = usePageVisibility()

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

  useEffect(() => {
    if (isVisible) {
      const brands = searchParams.getAll('brand')
      const newState: Record<string, boolean> = {}

      brands.forEach((brand) => {
        newState[brand] = true
      })
      dispatch({ type: 'set', newState })
    }
  }, [isVisible, searchParams])

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

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })

    dispatch({ type: 'toggle', brand: value })
  }

  const isAllChecked = useMemo(() => {
    if (isVisible) {
      const brands = searchParams.getAll('brand')

      return brands.length === 0
    }

    return false
  }, [searchParams, isVisible])

  return (
    <aside className='' data-type='aside' id='filters'>
      <div className='flex items-center justify-between gap-4' id='filters'>
        <div className='relative flex w-full items-center'>
          <SearchIcon className='absolute left-3 h-4 w-4 text-breakerbay-700 opacity-40 dark:text-sky-100' />
          <Input
            className='w-full pl-8'
            defaultValue={searchParams.get('query')?.toString()}
            placeholder='iPhone...'
            type='search'
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <h2 className='my-3 ml-2 text-xl font-semibold'>Marcas</h2>
      <div className='mb-4 flex flex-1 flex-col gap-5 overflow-y-auto [scrollbar-color:_#0099ff90_var(--color)] [scrollbar-width:_thin]'>
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
              <Checkbox checked={stateCheckbox[brand] || false} name={brand} onChange={handleBrand}>
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
