import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CurryClubLogo from '../../../assets/curry_club_logo.png'
import hamburgerIcon from '../../../assets/icons/hamburger.png'

const MobileNavigation = () => {
  return (
    <div className="sm:flex md:hidden fixed top-0 left-0 z-50 bg-twPink w-full flex items-center justify-between">
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
        <Link href="/pages/mobileNavigation" className="absolute top-3 right-4">
          <Image src={hamburgerIcon} width={25} height={25} alt="Close" />
        </Link>
      </nav>
    </div>
  )
}

export default MobileNavigation
