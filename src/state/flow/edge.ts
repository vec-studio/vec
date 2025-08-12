import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import { type EdgeBase } from '@xyflow/system'
import z from 'zod'

export const flowEdgeCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow-edge',
    storageKey: 'vec-collection-flow-edge',
    getKey: item => item.id,
    schema: z.object({ id: z.string().nonempty(), data: z.custom<EdgeBase>(), flowId: z.string().nonempty() })
  })
)
