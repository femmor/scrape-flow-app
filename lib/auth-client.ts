import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, signOut, useSession } = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000")
})

export const signInWithGoogle = async () => {
    const data = await signIn.social({
        provider: "google",
        callbackURL: "/",
    })

    return data
}