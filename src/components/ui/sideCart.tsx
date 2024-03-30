import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

import { CloseIcon } from '../icons/close'

export function SideCart({
  openModalId,
  children,
  onClose,
  title
}: {
  openModalId: number | string | null
  children: React.ReactNode
  onClose: VoidFunction
  title: string
}) {
  useEffect(() => {
    if (openModalId) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [openModalId])

  return (
    <AnimatePresence>
      {openModalId ? (
        <motion.div
          key={openModalId}
          layout
          animate={{ opacity: 1, x: 0 }}
          className='
            fixed
            left-0
            top-0
            z-50
            flex
            h-[100svh]
            w-full
            flex-col
            gap-8
            bg-black/80 backdrop-blur-[2px]
          '
          exit={{ opacity: 0, x: 15 }}
          initial={{ opacity: 0, x: 15 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.aside
            key={openModalId}
            layout
            className='flex h-full w-[85%] flex-col justify-between gap-12 self-end overflow-y-auto border-l-4 border-l-breakerbay-500 bg-cyan-700 p-8 text-breakerbay-50 dark:bg-slate-950 md:w-[450px]'
          >
            <header className='flex flex-grow-0 items-start justify-between'>
              <h2 className='text-2xl font-semibold md:text-3xl'>{title}</h2>
              <button
                className='-my-1 rounded-full bg-breakerbay-900 p-2 text-breakerbay-50 transition-all duration-300 hover:text-breakerbay-200 active:scale-90 dark:hover:bg-breakerbay-950 '
                type='button'
                onClick={() => {
                  onClose()
                }}
              >
                <CloseIcon className='' />
              </button>
            </header>
            {children}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
