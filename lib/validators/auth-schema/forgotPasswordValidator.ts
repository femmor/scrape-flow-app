import z from "zod";

export const forgotPasswordValidator = z.object({
    email: z.string().email(),
})