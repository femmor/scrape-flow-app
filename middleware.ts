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

    // Skip middleware for public routes
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    // For now, let's log what we're trying to protect but not actually redirect
    // This will help us debug the session issue
    if (isProtectedRoute) {

        try {
            // Get session using Better Auth's server API
            const session = await auth.api.getSession({
                headers: request.headers
            })

            // For now, just allow through and let client-side handle protection
            return NextResponse.next()

        } catch (error) {
            console.error('Middleware session check failed:', error)
            // Allow through for now - let client-side handle it
            return NextResponse.next()
        }
    }

    return NextResponse.next()
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
