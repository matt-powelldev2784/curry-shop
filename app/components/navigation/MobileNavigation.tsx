import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import hamburgerIcon from '../../assets/icons/hamburger.png'

const MobileNavigation = () => {
  return (
    <div className="sm:flex md:hidden m-1 mr-3 sm:h-[39px] md:h-[56px] flexRow gap-6 text-white font-bold">
      <Link href="/pages/mobileNavigation" className="text-4xl md:hidden">
        <Image
          src={hamburgerIcon}
          width={25}
          height={25}
          alt="hamburger menu"
        />
      </Link>
    </div>
  )
}

export default MobileNavigation
