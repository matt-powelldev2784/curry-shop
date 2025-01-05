import Link from 'next/link'
import React from 'react'

const DesktopButtons = () => {
  return (
    <ul className="sm:hidden md:flex m-1 mr-4 sm:h-[39px] md:h-[56px] flexRow gap-6 text-white font-bold">
      <Link href="/pages/menu">
        <li>MENU</li>
      </Link>

      <Link href="/pages/login">
        <li>LOGIN</li>
      </Link>

      <Link href="/">
        <li>ADMIN CONSOLE</li>
      </Link>
    </ul>
  )
}

export default DesktopButtons
