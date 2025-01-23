'use client'

import { signOut } from 'next-auth/react'

const Logout = () => {
  return (
    <div className="flex flex-col items-center">
      <p>Logout Page</p>

      <button
        type="submit"
        onClick={async () => await signOut({ redirectTo: '/pages/foodmenu' })}
        className="p-2 bg-red-500"
      >
        Sign out
      </button>
    </div>
  )
}

export default Logout
