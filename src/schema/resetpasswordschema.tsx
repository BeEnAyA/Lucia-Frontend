import { z } from "zod";

export const ResetPasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})