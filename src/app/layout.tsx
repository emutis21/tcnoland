import type { Metadata } from 'next'

import { Jost } from 'next/font/google'

import '@/styles/globals.scss'
import CartProvider from '@/modules/cart/context'
import ProductProvider from '@/modules/product/context'
import ThemeProvider from '@/theme/context'

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tcnoland',
  description: 'Una página web fantástica de venta de celulares'
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
            <CartProvider>{children}</CartProvider>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
