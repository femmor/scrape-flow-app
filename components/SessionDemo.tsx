"use client"

import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export function SessionDemo() {
    const { user, isAuthenticated, isLoading } = useAuth()
    const [testAction, setTestAction] = useState<string>('')

    const handleProtectedAction = () => {
        if (!isAuthenticated) {
            setTestAction('❌ Action blocked: Not authenticated')
            return
        }

        setTestAction('✅ Action successful: User is authenticated')
    }

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Client Session Demo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Client Session Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-medium mb-2">Client-side Session Status:</h3>
                    {isAuthenticated ? (
                        <div className="text-green-600 space-y-1">
                            <p>✅ Authenticated</p>
                            <p className="text-sm">User: {user?.name} ({user?.email})</p>
                        </div>
                    ) : (
                        <p className="text-red-600">❌ Not authenticated</p>
                    )}
                </div>

                <div>
                    <Button onClick={handleProtectedAction} variant="outline">
                        Test Protected Action
                    </Button>
                    {testAction && (
                        <p className="text-sm mt-2">{testAction}</p>
                    )}
                </div>

                <div className="text-xs text-muted-foreground">
                    <p>This component uses the useAuth() hook for client-side session management.</p>
                </div>
            </CardContent>
        </Card>
    )
}
