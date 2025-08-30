import { type NodeBase } from '@xyflow/system'
import { z } from 'zod'
import { flowSchema } from './flow'

export const flowNodeSchema = z.object({
  id: z.string().nonempty(),
  data: z.custom<NodeBase>(),
  flowId: flowSchema.shape.id,
  createdAt: z.number().nullish(),
  updatedAt: z.number().nullish(),
  deletedAt: z.number().nullish()
})

export type FlowNode = z.infer<typeof flowNodeSchema>
