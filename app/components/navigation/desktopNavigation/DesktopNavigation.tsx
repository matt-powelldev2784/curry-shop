import Image from 'next/image'
import React from 'react'
import CurryClubLogo from '../../../assets/curry_club_logo.png'
import Link from 'next/link'

const DesktopNavigation = () => {
  return (
    <div className="sm:hidden md:flex bg-twPink w-full flex items-center justify-between">
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
    </div>
  )
}

export default DesktopNavigation
