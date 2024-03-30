'use client'

import { useCycle } from 'framer-motion'

import { HamburgerComponent } from '../hamburger'
import { AsideComponent } from '../aside'

import { FlyoutLink } from './FlyoutLink'
import { PhoneContent } from './PhoneContent'
import { Sidebar } from './Sidebar'
import '@/styles/navbar.scss'

export function Navbar() {
  const [isOpen, cycleIsOpen] = useCycle(false, true)

  const toggleOpen = () => {
    cycleIsOpen()
  }

  const onClose = () => {
    cycleIsOpen()
  }

  return (
    <>
      <header className='h-fit pt-5 [grid-column:full-width]'>
        <picture className='grid place-content-center'>
          <source media='(min-width: 768px)' srcSet='/assets/tcno.webp' />
          <img
            alt='Logo Tcnoland'
            className='w-32 rounded-full md:w-48'
            src='/assets/tcno-mobile.webp'
          />
        </picture>
      </header>

      <nav className={isOpen ? 'open' : 'closed'} data-type='navbar'>
        <HamburgerComponent className='max-w-10' isOpen={isOpen} setIsOpen={toggleOpen} />
        <FlyoutLink FlyoutContent={PhoneContent} href='#'>
          Celulares
        </FlyoutLink>
        <FlyoutLink href='#'>Accesorios</FlyoutLink>
        <FlyoutLink href='#'>Servicios</FlyoutLink>
        <FlyoutLink href='#'>Contacto</FlyoutLink>

        <Sidebar isOpen={isOpen} onClose={onClose}>
          <AsideComponent />
        </Sidebar>
      </nav>
    </>
  )
}
