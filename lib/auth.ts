import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "../auth-schema";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import { nextCookies } from "better-auth/next-js";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    baseURL: process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        async sendResetPassword({ user, url, token }) {
            // Custom reset URL that points to your reset password page
            const resetUrl = `${process.env.BETTER_AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`;
            
            try {
                const result = await resend.emails.send({
                    from: "onboarding@resend.dev", // Use Resend's testing domain
                    to: user.email,
                    subject: "Reset your password",
                    react: ForgotPasswordEmail({ username: user.name || user.email, resetUrl, userEmail: user.email }),
                });

                console.log('Email sent successfully:', result);
                console.log('Reset URL sent:', resetUrl);
            } catch (error) {
                console.error('Failed to send reset password email:', error);
                throw error;
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [nextCookies()] // make sure this is the last plugin in the array
});