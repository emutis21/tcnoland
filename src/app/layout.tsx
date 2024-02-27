import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

import './globals.scss'
import CartProvider from '@/modules/cart/context'
import ProductProvider from '@/modules/product/context'

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
    <html lang='es'>
      <body className={jost.className}>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </body>
    </html>
  )
}
