'use client'
import Image from 'next/image'
import closeIcon from '../../../assets/icons/x_square.png'
import { useRouter } from 'next/navigation'

const CloseMenu = () => {
  const router = useRouter()

  return (
    <button
      className="absolute top-3 right-4 bg-twPink z-20"
      onClick={() => router.back()}
    >
      <Image src={closeIcon} width={25} height={25} alt="Close" />
    </button>
  )
}

export default CloseMenu
