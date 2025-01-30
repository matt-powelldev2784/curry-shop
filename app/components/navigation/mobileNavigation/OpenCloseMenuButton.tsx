'use client'

import Image from 'next/image'
import hamburgerIcon from '../../../assets/icons/hamburger.png'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import closeIcon from '../../../assets/icons/x_square.png'

const OpenCloseMenuButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const isMobileNavigation = pathname === '/pages/mobileNavigation'

  const handleMenuClick = () => {
    if (pathname === '/pages/mobileNavigation') {
      router.back()
      return
    }
    router.push('/pages/mobileNavigation')
  }

  return (
    <button onClick={handleMenuClick} className="absolute top-3 right-4">
      {isMobileNavigation ? (
        <Image src={closeIcon} width={25} height={25} alt="close menu" />
      ) : (
        <Image src={hamburgerIcon} width={25} height={25} alt="open menu" />
      )}
    </button>
  )
}

export default OpenCloseMenuButton
