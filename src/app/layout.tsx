import type { Metadata } from 'next'

import { Jost } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/globals.scss'
import CartProvider from '~/cart/context'
import ProductProvider from '~/product/context'

import ThemeProvider from '@/theme/context'

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tcnoland',
  description: 'Una página web fantástica de venta de celulares',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tcnoland.vercel.app/',
    siteName: 'Tcnoland',
    images: [
      {
        url: 'https://tcnoland.vercel.app/assets/tcno.webp',
        width: 300,
        height: 300,
        alt: 'Tcnoland'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='es'>
      <body className={jost.className}>
        <ThemeProvider>
          <ProductProvider>
            <CartProvider>
              {children}
              <SpeedInsights />
              <Analytics />
            </CartProvider>
            <footer className='sticky grid h-fit place-content-center bg-transparent p-6 pt-12 [grid-column:full-width]'>
              <p className='text-center'>
                Tcnoland {new Date().getFullYear()}. Hecho con ❤️ por Esteban Mutis
              </p>
            </footer>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
