"use server"

import { getServerSession } from '@/components/ProtectedRoute'

export async function requireServerAuth() {
    const session = await getServerSession()

    if (!session?.user) {
        throw new Error('Authentication required')
    }

    return { session, user: session.user }
}
