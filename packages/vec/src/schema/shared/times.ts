import { z } from 'zod'

export const times = z.object({
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish()
})
