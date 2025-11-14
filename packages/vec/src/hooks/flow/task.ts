import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useQueryClient } from '@tanstack/react-query'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { useMemo } from 'react'
import { flowTaskSchema } from 'src/schema/flow-task'
import {
  addFlowTaskServerFn,
  deleteFlowTaskServerFn,
  listFlowTaskServerFn,
  updateFlowTaskServerFn
} from 'src/server/flow/task'
import { z } from 'zod'
import { useFlowContext } from './index'

// tasks live query
export function useFlowTasks() {
  const flowContext = useFlowContext()
  const flowTaskCollection = useFlowTaskCollection()

  const nodeQuery = useLiveQuery(q =>
    q.from({ node: flowTaskCollection }).where(({ node }) => eq(node.flowId, flowContext.id))
  )

  const tasks = nodeQuery.data.map(v => v.data)

  return tasks
}

// task tanstack-db collection
export function useFlowTaskCollection() {
  const queryClient = useQueryClient()
  const isFirstRender = useIsFirstRender()
  const flowContext = useFlowContext()

  const flowTaskCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-node',
          queryClient,
          queryKey: ['flow-node', flowContext.id],
          queryFn: async () => {
            const a1 = await listFlowTaskServerFn({ data: { flowId: flowContext.id } })
            const a2 = z.array(flowTaskSchema).parse(a1)
            return a2
          },
          getKey: item => item.id,
          schema: flowTaskSchema,
          onInsert: async ({ transaction, collection }) => {
            const { modified } = transaction.mutations[0]
            const o = await addFlowTaskServerFn({ data: modified })
            collection.utils.writeInsert(o)
            return { refetch: false }
          },
          onUpdate: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await updateFlowTaskServerFn({ data: modified })
            return { refetch: false }
          },
          onDelete: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await deleteFlowTaskServerFn({ data: { id: modified.id } })
            return { refetch: false }
          }
        })
      ),
    [flowContext.id]
  )

  // a new collections doesn't start syncing until you call collection.preload() or you query it
  if (isFirstRender) flowTaskCollection.preload()

  return flowTaskCollection
}
