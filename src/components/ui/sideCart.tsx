import { AnimatePresence, motion } from 'framer-motion'

export const SideCart = ({
  openModalId,
  children,
  onClose
}: {
  openModalId: number | string | null
  children: React.ReactNode
  onClose: VoidFunction
}) => {
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
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
