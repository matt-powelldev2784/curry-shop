import Link from 'next/link'
import React from 'react'

const DesktopButtons = () => {
  return (
    <ul className="sm:hidden md:flex m-1 mr-4 sm:h-[39px] md:h-[56px] flexRow gap-6 text-white font-bold">
      <li>
        <Link href="/pages/menu">FOOD MENU</Link>
      </li>

      <li>
        <Link href="/pages/login">LOGIN</Link>
      </li>

      <li>
        <Link
          legacyBehavior
          href="https://curry-shop.sanity.studio/structure/menuItems"
        >
          <a target="_blank" rel="noopener noreferrer">
            ADMIN CONSOLE
          </a>
        </Link>
      </li>
    </ul>
  )
}

export default DesktopButtons
