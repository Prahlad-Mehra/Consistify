import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/','/signin(.*)','/signup(.*)', '/api/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const url = req.nextUrl.clone()
 
  // If user is authenticated and trying to access the landing page
  if (userId && url.pathname === '/') {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Protect other routes if needed
  if (!isPublicRoute(req) && !userId) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};