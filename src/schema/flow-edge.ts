import { type EdgeBase } from '@xyflow/system'
import { z } from 'zod'
import { flowSchema } from './flow'

export const flowEdgeSchema = z.object({ id: z.string().nonempty(), data: z.custom<EdgeBase>(), flowId: flowSchema.shape.id })

export type FlowEdge = z.infer<typeof flowEdgeSchema>
