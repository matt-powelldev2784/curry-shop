'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const LoginLogoutButton = () => {
  const session = useSession()
  console.log('session.status', session.status)

  if (session.status === 'authenticated') {
    return (
      <li>
        <Link href="/pages/logout">LOGOUT</Link>
      </li>
    )
  }

  return (
    <li>
      <Link href="/pages/login">LOGIN</Link>
    </li>
  )
}

export default LoginLogoutButton
