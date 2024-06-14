import { z } from "zod";

export const messageSchema = z.object({
    content: z.string()
        .min(10, { message: 'contnent must be stleasy 10 charecters' })
        .max(400, { message: 'content be no longer rhan 400 charecters' }),
})
