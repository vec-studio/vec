import { z } from 'zod'

export const entityTypes = ['form', 'table'] as const
export type EntityTypes = typeof entityTypes
export type EntityType = EntityTypes[number]

export const entitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(entityTypes)
})

export type Entity = z.infer<typeof entitySchema>
