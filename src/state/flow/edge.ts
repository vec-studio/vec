import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import z from 'zod'

export const flowEdgeCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow-edge',
    storageKey: 'vec-collection-flow-edge',
    getKey: item => item.id,
    schema: z.object({ id: z.string().nonempty() })
  })
)
