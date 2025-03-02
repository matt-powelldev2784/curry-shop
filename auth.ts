import prisma from '@/prisma/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database',
  },
  pages: {
    signIn: '/pages/signin',
    signOut: '/pages/signout',
  },
  providers: [GitHub],
})
