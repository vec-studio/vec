import { z } from 'zod'

export const actionSchema = z.object({
  id: z.string(),
  //
  // sql insert/update
  action: z.string()
})

export type Action = z.infer<typeof actionSchema>
