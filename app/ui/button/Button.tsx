import React from 'react'
import loadingIcon from '../../assets/icons/loading.png'
import Image from 'next/image'

interface ButtonProps {
  onClick?: () => void
  isLoading?: boolean
  text: string
  disabled?: boolean
}

const Button = ({ onClick, isLoading, text, disabled }: ButtonProps) => {
  return (
    <button
      className="h-[40px] w-[300px] text-white bg-twBlack my-5 flexCol active:bg-black/75"
      onClick={onClick}
      disabled={disabled}
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
