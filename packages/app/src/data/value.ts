import { z } from 'zod'

export const valueSchema = z.object({
  id: z.string(),
  value: z.record(z.string(), z.any())
})

export type Value = z.infer<typeof valueSchema>
