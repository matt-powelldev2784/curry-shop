import { auth } from '../auth/auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/pages/login') {
    const newUrl = new URL('/pages/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})
