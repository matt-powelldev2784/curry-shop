'use client'
import Image from 'next/image'
import closeIcon from '../../assets/icons/x_square.png'
import { useRouter } from 'next/navigation'

const CloseMenu = () => {
  const router = useRouter()

  return (
    <button className="absolute top-4 right-6" onClick={() => router.back()}>
      <Image src={closeIcon} width={30} height={30} alt="Close" />
    </button>
  )
}

export default CloseMenu
