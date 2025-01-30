'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import loginIcon from '@/app/assets/icons/login.png'

const Logout = () => {
  const onSignOut = async () => {
    await signOut({ redirectTo: '/pages/foodmenu' })
  }

  return (
    <section className="w-full flex flex-col items-center bg-twLightGrey min-h-screen">
      <form
        className="flexCol w-full max-w-[700px] md:rounded-3xl md:border-2 md:border-twPink px-4 md:mt-8 text-twBlack"
        onSubmit={(e) => {
          e.preventDefault()
          onSignOut()
        }}
      >
        <Image
          src={loginIcon}
          width={75}
          height={75}
          alt="Logout icon"
          className="m-4 mt-8"
        />

        <p className="font-bold text-3xl text-twBlack">LOGOUT</p>

        <button
          type="submit"
          className="flexRow gap-4 h-[50px] w-[300px] text-white text-lg font-bold bg-twBlack my-10 rounded active:bg-black/75"
        >
          Sign out
        </button>
      </form>
    </section>
  )
}

export default Logout
