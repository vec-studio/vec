import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import z from 'zod'

export const flowNodeCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow-node',
    storageKey: 'vec-collection-flow-node',
    getKey: item => item.id,
    schema: z.object({ id: z.string().nonempty() })
  })
)
