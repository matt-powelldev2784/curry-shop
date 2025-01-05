import Image from 'next/image'
import React from 'react'
import CurryClubLogo from '../../assets/curry_club_logo.png'
import Link from 'next/link'

const NavigationBar = () => {
  return (
    <nav className="bg-twPink w-full flex items-center justify-between">
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

      <ul className="m-1 mr-4 sm:h-[39px] relative md:h-[56px] flexRow gap-6 text-white font-bold">
        <li>MENU</li>
        <li>LOGIN</li>
        <li>ADMIN CONSOLE</li>
      </ul>
    </nav>
  )
}

export default NavigationBar
