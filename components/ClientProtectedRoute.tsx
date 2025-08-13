"use client"

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
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

    useEffect(() => {
        if (!isPending && !session?.user) {
            const currentPath = window.location.pathname
            const redirectUrl = `${fallbackUrl}?callbackUrl=${encodeURIComponent(currentPath)}`
            router.push(redirectUrl)
        }
    }, [session, isPending, router, fallbackUrl])

    // Show loading spinner while checking session
    if (isPending) {
        return (
            <LoadingSpinner />
        )
    }

    // Show nothing if no session (will redirect in useEffect)
    if (!session?.user) {
        return null
    }

    return <>{children}</>
}
