import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

// import { CloseIcon } from '../icons/close'

export function Sidebar({
  isOpen,
  children,
  onClose
}: {
  isOpen?: boolean
  children?: React.ReactNode
  onClose: VoidFunction
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          layout
          animate={{ opacity: 1, x: 0 }}
          className='
            fixed
            left-0
            top-0
            -z-10
            flex
            h-[100svh]
            w-full
            justify-start
            gap-4
            bg-black/80
            backdrop-blur-[2px]
          '
          exit={{ opacity: 0, x: -15 }}
          initial={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.aside
            layout
            className='flex h-full flex-col justify-between self-end overflow-y-auto text-breakerbay-950 dark:text-breakerbay-50'
          >
            {children}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
