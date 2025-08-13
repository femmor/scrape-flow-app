
"use client"

import { useSession } from '@/lib/auth-client'
import { SessionDemo } from '@/components/SessionDemo'

function HomePage() {
    const { data: session, isPending } = useSession()

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Welcome to Scrape Flow</h1>
                <p className="text-muted-foreground">
                    Your workflow automation platform
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Session Information</h2>

                    {session?.user ? (
                        <div className="space-y-2">
                            <p><strong>User ID:</strong> {session.user.id}</p>
                            <p><strong>Name:</strong> {session.user.name}</p>
                            <p><strong>Email:</strong> {session.user.email}</p>
                            <p><strong>Email Verified:</strong> {session.user.emailVerified ? 'Yes' : 'No'}</p>
                            <p className="text-sm text-green-600">✅ Session is active</p>
                        </div>
                    ) : (
                        <p className="text-red-600">❌ No active session</p>
                    )}
                </div>

                <SessionDemo />
            </div>

            <div className="bg-muted rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-card border rounded p-4">
                        <h3 className="font-medium">Create Workflows</h3>
                        <p className="text-sm text-muted-foreground">Build automated scraping workflows</p>
                    </div>
                    <div className="bg-card border rounded p-4">
                        <h3 className="font-medium">Manage Credentials</h3>
                        <p className="text-sm text-muted-foreground">Store API keys and credentials securely</p>
                    </div>
                    <div className="bg-card border rounded p-4">
                        <h3 className="font-medium">Monitor Usage</h3>
                        <p className="text-sm text-muted-foreground">Track your workflow execution</p>
                    </div>
                    <div className="bg-card border rounded p-4">
                        <h3 className="font-medium">Billing</h3>
                        <p className="text-sm text-muted-foreground">Manage your subscription</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage