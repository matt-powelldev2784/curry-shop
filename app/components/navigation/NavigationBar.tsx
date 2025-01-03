import Image from 'next/image'
import React from 'react'
import CurryClubLogo from '../../assets/curry_club_logo.png'

const NavigationBar = () => {
  return (
    <nav className="bg-twPink w-full h-14 flex items-stretch justify-between">
      <Image
        src={CurryClubLogo}
        style={{ objectFit: 'contain' }}
        alt="Curry Club Logo"
        sizes="(max-width: 600px) 200px, 300px"
        width={250}
        height={64}
        className="m-2"
      />

      <ul className="h-14 flex flex-row">
        <li>Menu</li>
        <li>Login</li>
      </ul>
    </nav>
  )
}

export default NavigationBar
