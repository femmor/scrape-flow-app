"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const signUpUser = async (username: string, email: string, password: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name: username,
                email,
                password,
            }
        })
        return { success: true, message: "Sign-up successful" };
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Sign-up failed" };
    }
}

export const signInUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        return { success: true, message: "Sign in successful" }
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Sign-in failed" };
    }
}

export const signOutUser = async () => {
    try {
        await auth.api.signOut({
            // This endpoint requires session cookies.
            headers: headers(),
        });
        return { success: true, message: "Sign out successful" }
    } catch (error) {
        const e = error as Error;
        return { success: false, message: e.message || "Something went wrong, please try again!" };
    }
}