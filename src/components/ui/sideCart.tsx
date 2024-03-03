import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { CloseIcon } from '../icons/close'

export const SideCart = ({
  openModalId,
  children,
  onClose,
  title
}: {
  openModalId: number | string | null
  children: React.ReactNode
  onClose: VoidFunction
  title: string
}) => {
  useEffect(() => {
    if (openModalId) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [openModalId])
  return (
    <AnimatePresence>
      {openModalId && (
        <motion.div
          key={openModalId}
          layout
          className='
            fixed
            left-0
            top-0
            z-50
            flex
            h-screen
            w-full
            flex-col
            gap-8
            bg-black/80 backdrop-blur-[2px]
          '
          data-testid='cart-item-drawer'
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 15 }}
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
            className='grid h-full w-[450px] gap-12 self-end overflow-y-auto border-l-4 border-l-breakerbay-500 bg-breakerbay-500 p-8 text-breakerbay-50 dark:bg-slate-950'
          >
            <header className='flex items-start justify-between'>
              <h2 className='text-3xl font-semibold'>{title}</h2>
              <button
                onClick={() => {
                  onClose()
                }}
                className='-my-1 rounded-full bg-breakerbay-900 p-2 text-breakerbay-50 transition-all duration-300 hover:text-breakerbay-200 active:scale-90 dark:hover:bg-breakerbay-950 '
              >
                <CloseIcon className='' />
              </button>
            </header>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
