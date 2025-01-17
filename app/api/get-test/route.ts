import { auth } from '@/app/api/auth/auth'

import { NextResponse } from 'next/server'

export const GET = auth(async (req) => {
  const { auth } = req
  console.log('auth', auth)
  return NextResponse.json({ user: auth?.user?.name })
})
