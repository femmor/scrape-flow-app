import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// Define protected routes
const protectedRoutes = [
    '/',
    '/workflows',
    '/credentials',
    '/billing'
]

// Define public routes
const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password'
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow API routes to pass through
    if (pathname.startsWith('/api/')) {
        return NextResponse.next()
    }

    // Allow static files and Next.js internals to pass through
    if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon')) {
        return NextResponse.next()
    }

    // For now, let's disable server-side session checking and let the client handle it
    // This will help us isolate the login redirect issue
    return NextResponse.next()

    // TODO: Re-enable server-side session checking once client-side login is working
    /*
    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    try {
        // Create headers for better-auth
        const authHeaders = new Headers()
        const cookie = request.headers.get('cookie')
        if (cookie) {
            authHeaders.set('cookie', cookie)
        }

        // Get session from better-auth
        const session = await auth.api.getSession({
            headers: authHeaders
        })

        // Only redirect if accessing a protected route without a session
        if (isProtectedRoute && !session) {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }

        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)

        // On error, treat as unauthenticated for protected routes only
        if (isProtectedRoute) {
            const loginUrl = new URL('/login', request.url)
            loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }

        return NextResponse.next()
    }
    */
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public (public files)
         */
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
}
