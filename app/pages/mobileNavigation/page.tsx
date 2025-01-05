import Link from 'next/link'
import React from 'react'
import CloseMenu from '@/app/components/navigation/CloseMenu'

const MobileNavigation = () => {
  return (
    <nav>
      <CloseMenu />

      <ul className="w-full h-full min-h-screen flexCol items-center justify-center gap-6 text-white font-bold bg-twPink">
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
    </nav>
  )
}

export default MobileNavigation
