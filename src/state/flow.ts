import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import z from 'zod'

export const flowCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow',
    storageKey: 'vec-collection-flow',
    getKey: item => item.id,
    schema: z.object({ id: z.string().nonempty() })
  })
)
