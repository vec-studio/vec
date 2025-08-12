import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import { type NodeBase } from '@xyflow/system'
import z from 'zod'

export const flowNodeCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow-node',
    storageKey: 'vec-collection-flow-node',
    getKey: item => item.id,
    schema: z.object({ id: z.string().nonempty(), data: z.custom<NodeBase>(), flowId: z.string().nonempty() })
  })
)
