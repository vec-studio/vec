import { type EdgeBase } from '@xyflow/system'
import { z } from 'zod'
import { flowSchema } from './flow'
import { times } from './shared/times'

export const flowEdgeSchema = z.object({
  id: z.string().nonempty(),
  flowId: flowSchema.shape.id,
  //
  ...times.shape,
  //
  data: z.custom<EdgeBase>()
})

export type FlowEdge = z.infer<typeof flowEdgeSchema>
