'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const OrderHistoryButton = () => {
  const session = useSession()
  console.log('session.status', session.status)

  if (session.status !== 'authenticated') {
    return null
  }

  return (
    <li>
      <Link href="/pages/orders?page=0">ORDER HISTORY</Link>
    </li>
  )
}

export default OrderHistoryButton
