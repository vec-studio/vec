import { z } from 'zod'
import { selectorSchema } from './selector'
import { actionSchema } from './action'

export const interfaceTypes = ['form', 'table'] as const
export type InterfaceTypes = typeof interfaceTypes
export type InterfaceType = InterfaceTypes[number]

export const interfaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(interfaceTypes),
  selectorId: selectorSchema.shape.id,
  actionId: actionSchema.shape.id
})

export type Interface = z.infer<typeof interfaceSchema>
