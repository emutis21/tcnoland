import { type Store } from '~/store/types'

import InstagramIcon from '../icons/instagram'
import { WhatsappIcon } from '../icons/whatsapp'
import { FacebookIcon } from '../icons/facebook'
import { TwitterIcon } from '../icons/twitter'

export function SocialMedia({ store }: { store: Store }) {
  return (
    <div className='relative'>
      <div className='absolute -top-7 left-0 flex -translate-y-1/2 transform gap-2'>
        {store.instagram ? (
          <a
            aria-label='Instagram'
            href={store.instagram}
            rel='noopener noreferrer'
            target='_blank'
            title='Síguenos en Instagram'
          >
            <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-breakerbay-600 transition-colors hover:text-sky-600 dark:text-breakerbay-50 dark:hover:text-breakerbay-400'>
              <InstagramIcon />
            </div>
          </a>
        ) : null}
        {store.whatsapp ? (
          <a
            aria-label='Whatsapp'
            href={store.whatsapp}
            rel='noopener noreferrer'
            target='_blank'
            title='Contáctanos por Whatsapp'
          >
            <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-breakerbay-600 transition-colors hover:text-sky-600 dark:text-breakerbay-50 dark:hover:text-breakerbay-400'>
              <WhatsappIcon />
            </div>
          </a>
        ) : null}
        {store.facebook ? (
          <a
            aria-label='Facebook'
            href={store.facebook}
            rel='noopener noreferrer'
            target='_blank'
            title='Síguenos en Facebook'
          >
            <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-breakerbay-600 transition-colors hover:text-sky-600 dark:text-breakerbay-50 dark:hover:text-breakerbay-400'>
              <FacebookIcon />
            </div>
          </a>
        ) : null}
        {store.twitter ? (
          <a
            aria-label='Twitter'
            href={store.twitter}
            rel='noopener noreferrer'
            target='_blank'
            title='Síguenos en Twitter'
          >
            <div className='bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-breakerbay-600 transition-colors hover:text-sky-600 dark:text-breakerbay-50 dark:hover:text-breakerbay-400'>
              <TwitterIcon />
            </div>
          </a>
        ) : null}
      </div>
    </div>
  )
}
