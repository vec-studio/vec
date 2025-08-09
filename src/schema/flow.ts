import z from 'zod'

export const flowSchema = z.object({ id: z.string().nonempty() })

export type Flow = z.infer<typeof flowSchema>
