import { z } from 'zod'
import { flowSchema } from './flow'
import { flowNodeSchema } from './flow-node'
import { times } from './shared/times'

export const flowTaskSchema = z.object({
  id: z.string().nonempty(),
  flowId: flowSchema.shape.id,
  flowNodeId: flowNodeSchema.shape.id,
  //
  ...times.shape,
  //
  data: z.string()
})

export type FlowTask = z.infer<typeof flowTaskSchema>
