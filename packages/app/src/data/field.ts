import { z } from 'zod'

export const fieldTypes = ['text', 'number', 'checkbox', 'date', 'select'] as const
export type FieldTypes = typeof fieldTypes
export type FieldType = FieldTypes[number]

export const formFieldSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  type: z.enum(fieldTypes),
  pattern: z.union([z.string(), z.instanceof(RegExp)])
})

export type FormField = z.infer<typeof formFieldSchema>
