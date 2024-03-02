'use client'

import { FlyoutLink } from './FlyoutLink'
import { PhoneContent } from './PhoneContent'

export const Navbar = () => {
  return (
    <>
      <header className='pt-5 [grid-column:full-width]'>
        <picture className='grid place-content-center'>
          <source srcSet='/assets/tcno.webp' media='(min-width: 768px)' />
          <img src='/assets/tcno-mobile.webp' alt='logo Tcnoland' className='w-48 rounded-full' />
        </picture>
      </header>
      <nav
        className='sticky top-1 z-10 mx-auto my-5 flex w-1/2 justify-around rounded-full p-3 [grid-column:full-width]'
        data-type='navbar'
      >
        <FlyoutLink href='#' FlyoutContent={PhoneContent}>
          Celulares
        </FlyoutLink>

        <FlyoutLink href='#'>Accesorios</FlyoutLink>

        <FlyoutLink href='#'>Servicios</FlyoutLink>

        <FlyoutLink href='#'>Contacto</FlyoutLink>
      </nav>
    </>
  )
}
