import { z } from 'zod'

export const columnTypes = ['text', 'number', 'checkbox', 'date', 'select'] as const
export type ColumnTypes = typeof columnTypes
export type ColumnType = ColumnTypes[number]

export const tableColumnSchema = z.object({
  id: z.string(),
  index: z.boolean().default(false),
  name: z.string(),
  label: z.string(),
  type: z.enum(columnTypes),
  pattern: z.union([z.string(), z.instanceof(RegExp)])
})

export type TableColumn = z.infer<typeof tableColumnSchema>
