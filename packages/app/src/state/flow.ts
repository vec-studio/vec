import { createCollection, localStorageCollectionOptions } from '@tanstack/react-db'
import z from 'zod'

export const userPreferencesCollection = createCollection(
  localStorageCollectionOptions({
    id: 'flow',
    storageKey: 'vec-state-flow',
    getKey: item => item.id,
    schema: z.object({})
  })
)
