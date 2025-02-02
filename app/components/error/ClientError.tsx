import React from 'react'
import Image from 'next/image'
import errorIcon from '../../assets/icons/error.png'
import { useRouter } from 'next/navigation'

type ErrorProps = {
  errorMessage: string
}

const ClientError = ({ errorMessage }: ErrorProps) => {
  const router = useRouter()

  const handleOnClick = () => {
    router.push('/')
  }

  return (
    <article className="flexCol w-full max-w-[700px] px-4 md:mt-8 ">
      <div className="flex flex-col items-center justify-center p-4 pt-8">
        <Image src={errorIcon} width={75} height={75} alt="" />

        <p className="font-bold text-xl text-center text-white bg-[#ff0000] p-2 px-10 mt-8 rounded">
          {errorMessage}
        </p>

        <button
          type="button"
          className="bg-[#ff0000] font-bold text-xl text-secondaryWhite px-4 py-1 cursor-pointer bottom-0 rounded text-white mt-8"
          onClick={handleOnClick}
        >
          Return to home page
        </button>
      </div>
    </article>
  )
}

export default ClientError
