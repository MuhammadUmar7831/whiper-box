import { z } from "zod";

export const siginSchema = z.object({
    indentifier: z.string(),
    password: z.string()
})
