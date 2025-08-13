import { z } from "zod"

export const registerValidator = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }).max(100),
    email: z.email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().max(100, { message: "Confirm Password must be at most 100 characters long" })
}).refine(
    (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
    {
        message: "Passwords must match",
        path: ["confirmPassword"],
    }
)