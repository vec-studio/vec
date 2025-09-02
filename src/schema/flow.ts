import { z } from 'zod'
import { times } from './shared/times'

export const flowSchema = z.object({
  id: z.string().nonempty(),
  //
  ...times.shape
})

export type Flow = z.infer<typeof flowSchema>
