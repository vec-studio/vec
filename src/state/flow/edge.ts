import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { flowEdgeSchema } from 'src/schema/flow-edge'
import { list } from 'src/server/flow-edge'

const queryClient = new QueryClient()

export const flowEdgeCollection = createCollection(
  queryCollectionOptions({
    id: 'flow-edge',
    queryClient,
    queryKey: ['flow-edge'],
    queryFn: async () => await list(),
    getKey: item => item.id,
    schema: flowEdgeSchema,
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0]
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0]
    },
    onDelete: async ({ transaction }) => {
      const { original } = transaction.mutations[0]
    }
  })
)
