import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import DesktopNavigation from './components/navigation/desktopNavigation/DesktopNavigation'
import MobileNavigation from './components/navigation/mobileNavigation/MobileNavigation'
import { ReactNode } from 'react'
import { CartProvider } from './context/CartContext'

const brandonGrotFont = localFont({
  src: [
    {
      path: './assets/fonts//Brandon_reg.otf',
      weight: '400',
    },
    {
      path: './assets/fonts/Brandon_bld.otf',
      weight: '700',
    },
    {
      path: './assets/fonts/Brandon_blk.otf',
      weight: '900',
    },
  ],
  variable: '--font-brandon',
})

export const metadata: Metadata = {
  title: 'Curry Club',
  description: 'Curry Club E-commerce App',
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body
        className={`${brandonGrotFont.variable} antialiased font-brandon text-base`}
      >
        <CartProvider>
          <DesktopNavigation />
          <MobileNavigation />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

export default RootLayout
