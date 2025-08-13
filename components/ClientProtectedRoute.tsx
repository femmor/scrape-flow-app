"use client"

import { useSession } from '@/lib/auth-client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ClientProtectedRouteProps {
    children: React.ReactNode
    fallbackUrl?: string
}

export function ClientProtectedRoute({
    children,
    fallbackUrl = '/login'
}: ClientProtectedRouteProps) {
    const { data: session, isPending } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [hasRedirected, setHasRedirected] = useState(false)

    useEffect(() => {
        // Don't redirect if we're still loading or already redirected
        if (isPending || hasRedirected) return

        if (!session?.user) {
            setHasRedirected(true)
            const redirectUrl = `${fallbackUrl}?callbackUrl=${encodeURIComponent(pathname)}`
            router.push(redirectUrl)
        }
    }, [session, isPending, router, fallbackUrl, pathname, hasRedirected])

    // Show loading spinner while checking session
    if (isPending) {
        return <LoadingSpinner />
    }

    // Show nothing if no session (will redirect in useEffect)
    if (!session?.user) {
        return <LoadingSpinner />
    }

    return <>{children}</>
}
