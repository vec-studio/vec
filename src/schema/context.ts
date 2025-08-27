import { z } from 'zod'
import { flowSchema } from './flow'

export const flowContextSchema = z.object({ id: flowSchema.shape.id, changedAt: z.number().optional() })

export type FlowContext = z.infer<typeof flowContextSchema>
