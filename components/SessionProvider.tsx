"use client"

import { ReactNode } from 'react'
import { useSession } from '@/lib/auth-client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface SessionProviderProps {
    children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
    const { data: session, isPending } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [hasHandledRedirect, setHasHandledRedirect] = useState(false)

    const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

    useEffect(() => {
        if (!isPending && !hasHandledRedirect) {
            // If on a public route and user is authenticated, redirect to home
            if (isPublicRoute && session?.user) {
                router.push('/')
                setHasHandledRedirect(true)
            }
            // If on a protected route and user is not authenticated, redirect to login
            else if (!isPublicRoute && !session?.user) {
                router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)
                setHasHandledRedirect(true)
            }
        }
    }, [session, isPending, pathname, isPublicRoute, router, hasHandledRedirect])

    // Reset redirect flag when pathname changes
    useEffect(() => {
        setHasHandledRedirect(false)
    }, [pathname])

    // Show loading spinner while checking session
    if (isPending) {
        return (
            <LoadingSpinner />
        )
    }

    return <>{children}</>
}
