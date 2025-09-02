import { z } from 'zod'
import { tableColumnSchema } from './column'

export const tableSchema = z.object({
  id: z.string(),
  columnIds: z.array(tableColumnSchema.shape.id),
  //
  name: z.string()
})

export type Table = z.infer<typeof tableSchema>
