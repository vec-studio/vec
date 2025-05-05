import { z } from 'zod'
import { sourceSchema } from './source'

export const interfaceTypes = ['form', 'table'] as const
export type InterfaceTypes = typeof interfaceTypes
export type InterfaceType = InterfaceTypes[number]

export const interfaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(interfaceTypes),
  sourceId: sourceSchema.shape.id
})

export type Interface = z.infer<typeof interfaceSchema>
