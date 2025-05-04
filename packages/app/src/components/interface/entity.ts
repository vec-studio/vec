import { z } from 'zod'
import { formSchema } from './form'
import { tableSchema } from './table'
import { valueSchema } from './value'

export const entitySchema = z.object({
  id: z.string(),
  formValues: z.record(formSchema.shape.id, valueSchema.shape.id),
  tableValues: z.record(tableSchema.shape.id, z.array(valueSchema.shape.id))
})

export type Entity = z.infer<typeof entitySchema>
