import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface FlyoutLinkProps {
  children: React.ReactNode
  href: string
  FlyoutContent?: React.FC
}

export function FlyoutLink({ children, href, FlyoutContent }: FlyoutLinkProps) {
  const [open, setOpen] = useState(false)

  const showFlyout = open && FlyoutContent

  return (
    <div
      className='group relative h-fit w-fit text-breakerbay-800 hover:text-breakerbay-500 dark:text-breakerbay-50 dark:hover:text-breakerbay-200'
      id='flyout-link'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a className='relative transition-colors' href={href}>
        {children}
        <span
          className='absolute -bottom-2 -left-2 -right-2 h-1
          origin-left  rounded-full bg-breakerbay-500
          transition-transform duration-300 ease-out
          '
          style={{
            transform: showFlyout ? 'scaleX(1)' : 'scaleX(0)'
          }}
        />
      </a>
      <AnimatePresence>
        {showFlyout ? (
          <motion.article
            animate={{ opacity: 1, y: 0 }}
            className='absolute left-1/2 top-12 w-max rounded-lg bg-sky-50 p-6 text-breakerbay-900 shadow-xl dark:bg-slate-950 dark:text-breakerbay-200'
            exit={{ opacity: 0, y: 15 }}
            initial={{ opacity: 0, y: 15 }}
            style={{ x: '-50%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className='absolute -top-6 left-0 right-0 h-6 bg-transparent' />
            <div
              className='absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 
            bg-sky-50 dark:bg-slate-950
            '
            />
            <FlyoutContent />
          </motion.article>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
