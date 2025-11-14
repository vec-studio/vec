import { z } from 'zod'

export const selectorSchema = z.object({
  id: z.string(),
  //
  // sql select
  selector: z.string()
})

export type Selector = z.infer<typeof selectorSchema>
