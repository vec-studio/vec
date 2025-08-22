import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { flowSchema } from 'src/schema/flow'
import { add, list } from 'src/server/flow'
import { flowEdgeCollection } from './edge'
import { flowNodeCollection } from './node'

const queryClient = new QueryClient()

export const flowCollection = createCollection(
  queryCollectionOptions({
    id: 'flow',
    queryKey: ['flow'],
    queryFn: async () => {
      return await list()
    },
    getKey: item => item.id,
    schema: flowSchema,
    queryClient,
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0]
      await add({ data: modified })
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0]
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0]
    }
  })
)

export { flowEdgeCollection, flowNodeCollection }
