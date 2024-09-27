import { z } from "zod";

export const VerifyEmailSchema = z.object({
    code: z.string().min(6, {
        message: "Code must 6 characters long"
    }).max(6, { message: "Code must 6 characters long" })
})