import { type NodeBase } from '@xyflow/system'
import { z } from 'zod'
import { flowSchema } from './flow'
import { times } from './shared/times'

export const flowNodeSchema = z.object({
  id: z.string().nonempty(),
  flowId: flowSchema.shape.id,
  //
  ...times.shape,
  //
  data: z.custom<NodeBase>()
})

export type FlowNode = z.infer<typeof flowNodeSchema>
