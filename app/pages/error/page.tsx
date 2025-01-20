import React from 'react'
import Image from 'next/image'
import errorIcon from '../../assets/icons/error.png'
import Link from 'next/link'

type ErrorProps = {
  errorMessage: string
}

const ServerErrorPage = ({ errorMessage }: ErrorProps) => {
  return (
    <article className="flexCol w-full h-full px-4 md:mt-8 ">
      <div className="flex flex-col items-center justify-center p-4 pt-8">
        <Image src={errorIcon} width={75} height={75} alt="" />

        <p className="font-bold text-xl text-center text-white bg-[#ff0000] p-2 px-10 mt-8 rounded">
          {errorMessage || 'Server Error'}
        </p>

        <Link
          href="/"
          className="bg-[#ff0000] font-bold text-xl text-secondaryWhite px-4 py-1 cursor-pointer bottom-0 rounded text-white mt-8"
        >
          Return to home page
        </Link>
      </div>
    </article>
  )
}

export default ServerErrorPage
