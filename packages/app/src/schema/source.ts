import { z } from 'zod'

export const sourceSchema = z.object({
  id: z.string(),
  // sql select
  selector: z.string(),
  data: z.array(z.record(z.string(), z.any()))
})

export type Source = z.infer<typeof sourceSchema>
