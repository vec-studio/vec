import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import z from 'zod'

export const userFlowCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow',
    storageKey: 'vec-collection-flow',
    getKey: item => item.id,
    schema: z.object({})
  })
)
