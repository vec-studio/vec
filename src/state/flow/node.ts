import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { flowNodeSchema } from 'src/schema/flow-node'
import { add, list } from 'src/server/flow-node'

const queryClient = new QueryClient()

export const flowNodeCollection = createCollection(
  queryCollectionOptions({
    id: 'flow-node',
    queryClient,
    queryKey: ['flow-node'],
    queryFn: async () => await list(),
    getKey: item => item.id,
    schema: flowNodeSchema,
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
