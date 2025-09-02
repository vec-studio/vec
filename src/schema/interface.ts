import { z } from 'zod'
import { selectorSchema } from './selector'
import { actionSchema } from './action'

export const interfaceTypes = ['form', 'table'] as const
export type InterfaceTypes = typeof interfaceTypes
export type InterfaceType = InterfaceTypes[number]

export const interfaceSchema = z.object({
  id: z.string(),
  actionId: actionSchema.shape.id,
  selectorId: selectorSchema.shape.id,
  //
  name: z.string(),
  type: z.enum(interfaceTypes)
})

export type Interface = z.infer<typeof interfaceSchema>
