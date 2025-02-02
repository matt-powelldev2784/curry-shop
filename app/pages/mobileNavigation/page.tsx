import LoginLogoutButton from '@/app/components/navigation/desktopNavigation/LoginLogoutButton'
import OrderHistoryButton from '@/app/components/navigation/desktopNavigation/OrderHistoryButton'
import Link from 'next/link'
import React from 'react'

const MobileNavigationPage = () => {
  return (
    <nav className="sm:flex md:hidden w-full h-full min-h-screen bg-twPink">
      <ul className="-translate-y-20 w-full flexCol items-center justify-center gap-6 text-white font-bold ">
        <li>
          <Link href="/pages/foodmenu">FOOD MENU</Link>
        </li>

        <LoginLogoutButton />

        <OrderHistoryButton />

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
