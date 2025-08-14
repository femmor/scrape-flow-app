import z from "zod";

export const resetPasswordValidator = z.object({
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(100),
    confirmNewPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters long" }).max(100),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match",
    path: ["confirmNewPassword"],
})