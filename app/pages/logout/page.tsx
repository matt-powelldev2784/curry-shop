'use client'

import { signOut } from 'next-auth/react'

const Logout = () => {
  const onSignOut = async () => {
    await signOut({ redirectTo: '/pages/foodmenu' })
  }

  return (
    <div className="flex flex-col items-center">
      <p>Logout Page</p>

      <button className="p-2 bg-red-500" onClick={onSignOut} type="submit">
        Sign out
      </button>
    </div>
  )
}

export default Logout
