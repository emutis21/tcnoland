'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type FlyoutLinkProps = {
  children: React.ReactNode
  href: string
  FlyoutContent?: React.FC
}

export const Navbar = () => {
  return (
    <>
      <div className='[grid-column:content] pt-5'>
        <picture className='grid place-content-center'>
          <source srcSet='/imgs/tcno.webp' media='(min-width: 768px)' />
          <img src='/imgs/tcno-mobile.webp' alt='logo Tcnoland' className='w-48 rounded-full' />
        </picture>
      </div>
      <nav className='sticky top-0 flex justify-between px-10 py-12 [grid-column:content]'>
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

const FlyoutLink: React.FC<FlyoutLinkProps> = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(true)

  const showFlyout = open && FlyoutContent

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className='group relative h-fit w-fit'
    >
      <a href={href} className='relative text-white'>
        {children}
        <span
          style={{
            transform: showFlyout ? 'scaleX(1)' : 'scaleX(0)'
          }}
          className='absolute -bottom-2 -left-2 -right-2 h-1
          origin-left  rounded-full bg-breakerbay-500
          transition-transform duration-300 ease-out
          '
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: '-50%' }}
            transition={{ duration: 0.2, esae: 'easeOut' }}
            className='absolute left-1/2 top-12 bg-white text-black'
          >
            <div className='absolute -top-6 left-0 right-0 h-6 bg-transparent' />
            <div className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white' />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const PhoneContent = () => {
  return <div className='p6 h-24 w-64 bg-white shadow-xl'></div>
}
