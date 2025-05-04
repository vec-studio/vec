import { z } from 'zod'
import { formFieldSchema } from './field'

export const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  fieldIds: z.array(formFieldSchema.shape.id)
})

export type Form = z.infer<typeof formSchema>
