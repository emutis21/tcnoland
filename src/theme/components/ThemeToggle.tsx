import { DesktopIcon } from '@/components/icons/desktop'
import { MoonIcon } from '@/components/icons/moon'
import { SunIcon } from '@/components/icons/sun'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // if (theme === 'system')

  return (
    <div className='self-end'>
      <button
        title='Use system theme'
        onClick={() => setTheme('system')}
        className={`${theme === 'system' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
      >
        <DesktopIcon className='h-6 w-6' />
      </button>
      <button
        title='Use light theme'
        onClick={() => setTheme('light')}
        className={`${theme === 'light' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
      >
        <SunIcon className='h-6 w-6' />
      </button>
      <button
        title='Use dark theme'
        onClick={() => setTheme('dark')}
        className={`${theme === 'dark' ? 'bg-slate-300 dark:bg-slate-700' : ''} transitions-colors rounded-md p-2 duration-300 hover:bg-slate-300 focus:bg-slate-300 dark:hover:bg-slate-700 dark:focus:bg-slate-700`}
      >
        <MoonIcon className='h-6 w-6' />
      </button>
    </div>
  )
}
