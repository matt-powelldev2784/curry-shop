import { auth } from '@/app/api/auth/auth'
import React, { ComponentType } from 'react'
import { redirect } from 'next/navigation'

const WithAuth = <T extends object>(Component: ComponentType<T>) => {
  return async function AuthenticatedComponent(props: T) {
    const session = await auth()
    if (!session?.user) redirect('/pages/login')

    return <Component {...props} session={session} />
  }
}

export default WithAuth
