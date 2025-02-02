import Image from 'next/image'
import React from 'react'
import CurryClubLogo from '../../../assets/curry_club_logo.png'
import Link from 'next/link'
import { auth } from '@/auth'

const DesktopNavigation = async () => {
  const session = await auth()

  return (
    <div className="sm:hidden md:flex fixed top-0 left-0 w-full bg-twPink items-center justify-between z-50">
      <Link
        href="/"
        className="m-1 ml-4 sm:h-[39px] w-[200px] relative md:w-[250px] md:h-[56px]"
      >
        <Image
          src={CurryClubLogo}
          style={{ objectFit: 'contain' }}
          alt="Curry Club Logo"
          fill
        />
      </Link>

      <nav>
        <ul className="m-1 mr-4 sm:h-[39px] md:h-[56px] flexRow gap-6 text-white font-bold">
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
    </div>
  )
}

export default DesktopNavigation
