'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

interface ProtectedRouteProps {
    children: React.ReactNode
    fallbackUrl?: string
}

export async function ProtectedRoute({
    children,
    fallbackUrl = '/login'
}: ProtectedRouteProps) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user) {
            redirect(fallbackUrl)
        }

        return <>{children}</>
    } catch (error) {
        console.error('Protected route error:', error)
        redirect(fallbackUrl)
    }
}

export async function getServerSession() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        return session
    } catch (error) {
        return null
    }
}
