import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import DesktopNavigation from './components/navigation/desktopNavigation/DesktopNavigation'
import MobileNavigation from './components/navigation/mobileNavigation/MobileNavigation'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandonGrotFont.variable} antialiased font-brandon text-base`}
      >
        <DesktopNavigation />
        <MobileNavigation />
        {children}
      </body>
    </html>
  )
}
