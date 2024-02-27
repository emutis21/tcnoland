import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

type FlyoutLinkProps = {
  children: React.ReactNode
  href: string
  FlyoutContent?: React.FC
}

export const FlyoutLink: React.FC<FlyoutLinkProps> = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false)

  const showFlyout = open && FlyoutContent

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className='group relative h-fit w-fit hover:text-breakerbay-200'
    >
      <a href={href} className='relative transition-colors'>
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
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ x: '-50%' }}
            transition={{ duration: 0.2, esae: 'easeOut' }}
            className='absolute left-1/2 top-12 w-max rounded-lg bg-slate-50 p-6 shadow-xl dark:bg-slate-950'
          >
            <div className='absolute -top-6 left-0 right-0 h-6 bg-transparent' />
            <div
              className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 
            bg-slate-50 dark:bg-slate-950
            '
            />
            <FlyoutContent />
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  )
}
