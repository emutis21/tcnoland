import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { DesktopIcon } from '@/components/icons/desktop'
import { MoonIcon } from '@/components/icons/moon'
import { SunIcon } from '@/components/icons/sun'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className='space-x-2 self-end'>
      <button
        className={`${theme === 'system' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
        title='Usar tema del sistema'
        type='button'
        onClick={() => setTheme('system')}
      >
        <DesktopIcon className='h-5 w-5 md:h-6 md:w-6' />
      </button>
      <button
        className={`${theme === 'light' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
        title='Usar tema claro'
        type='button'
        onClick={() => setTheme('light')}
      >
        <SunIcon className='h-5 w-5 md:h-6 md:w-6' />
      </button>
      <button
        className={`${theme === 'dark' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
        title='Usar tema oscuro'
        type='button'
        onClick={() => setTheme('dark')}
      >
        <MoonIcon className='h-5 w-5 md:h-6 md:w-6' />
      </button>
    </div>
  )
}
