import React from 'react'
import loadingIcon from '../../assets/icons/loading.png'
import Image from 'next/image'

interface ButtonProps {
  onClick: () => void
  isLoading: boolean
  text: string
}

const Button = ({ onClick, isLoading, text }: ButtonProps) => {
  return (
    <button
      className="h-[40px] w-[300px] text-white bg-twBlack my-5 flexCol"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Image
          src={loadingIcon}
          width={20}
          height={20}
          alt="loading"
          className="animate-spin"
        />
      ) : (
        text
      )}
    </button>
  )
}

export default Button
