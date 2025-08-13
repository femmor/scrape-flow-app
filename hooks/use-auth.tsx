"use client"

import { useSession as useBetterAuthSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const { data: session, isPending, error } = useBetterAuthSession()
    const router = useRouter()

    const isAuthenticated = !!session?.user
    const isLoading = isPending
    const user = session?.user

    const requireAuth = () => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
            return false
        }
        return true
    }

    const redirectIfAuthenticated = (to: string = '/') => {
        if (!isLoading && isAuthenticated) {
            router.push(to)
        }
    }

    return {
        session,
        user,
        isAuthenticated,
        isLoading,
        error,
        requireAuth,
        redirectIfAuthenticated,
    }
}

// Server-side utility function
export async function requireServerAuth() {
    const { getServerSession } = await import('@/components/ProtectedRoute')
    const session = await getServerSession()

    if (!session?.user) {
        throw new Error('Authentication required')
    }

    return { session, user: session.user }
}
