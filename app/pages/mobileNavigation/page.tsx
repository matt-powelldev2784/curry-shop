import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'

const MobileNavigationPage = async () => {
  const session = await auth()

  return (
    <nav className="sm:flex md:hidden w-full h-full min-h-screen bg-twPink">
      <ul className="-translate-y-20 w-full flexCol items-center justify-center gap-6 text-white font-bold ">
        <li>
          <Link href="/pages/foodmenu">FOOD MENU</Link>
        </li>

        {session && (
          <li>
            <Link href="/pages/orders?page=0">ORDER HISTORY</Link>
          </li>
        )}

        {session && (
          <li>
            <Link href="/pages/logout">LOGOUT</Link>
          </li>
        )}

        {!session && (
          <li>
            <Link href="/pages/login">LOGIN</Link>
          </li>
        )}

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

export default MobileNavigationPage
