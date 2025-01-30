'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const LoginLogoutButton = () => {
  const session = useSession()
  console.log('session.status', session.status)

  if (session.status === 'authenticated') {
    return <Link href="/pages/logout">LOGOUT</Link>
  }

  return <Link href="/pages/login">LOGIN</Link>
}

export default LoginLogoutButton
