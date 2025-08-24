import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, localStorageCollectionOptions, useLiveQuery } from '@tanstack/react-db'
import { useQueryClient } from '@tanstack/react-query'
import consola from 'consola'
import { nanoid } from 'nanoid'
import { flowSchema, type Flow } from 'src/schema/flow'
import { add as addFlowServerFunction, list as listFlowServerFunction } from 'src/server/flow'
import z from 'zod'
export { useFlowEdges, useOnConnect, useOnEdgesChange } from './edge'
export { useFlowNodes, useOnNodesChange, useUpdateFunctionNode } from './node'

export function useAddFlow(flowId: Flow['id']) {
  const flowCollection = useFlowCollection(flowId)

  const addFlow = async () => {
    try {
      const id = nanoid()

      const tx = flowCollection.insert({ id })
      await tx.isPersisted.promise

      return id
    } catch (err) {
      consola.error(err)
    }
  }
  return addFlow
}

export function useFlowCollection(id: Flow['id']) {
  const queryClient = useQueryClient()

  const flowCollection = createCollection(
    queryCollectionOptions({
      id: 'flow',
      queryKey: ['flow', id],
      queryFn: async () => {
        return await listFlowServerFunction({ data: { id } })
      },
      getKey: item => item.id,
      schema: flowSchema,
      queryClient,
      onInsert: async ({ transaction }) => {
        const { modified } = transaction.mutations[0]
        await addFlowServerFunction({ data: modified })
      },
      onUpdate: async ({ transaction }) => {
        const { original, modified } = transaction.mutations[0]
      },
      onDelete: async ({ transaction }) => {
        const { original } = transaction.mutations[0]
      }
    })
  )

  return flowCollection
}

export function useFlowContext() {
  const flowContextCollection = useFlowContextCollection()
  const flowContextQuery = useLiveQuery(q => q.from({ context: flowContextCollection }))
  return flowContextQuery.data[0] || null
}

export function useFlowContextCollection() {
  const flowCollection = createCollection(
    localStorageCollectionOptions({
      id: 'flow-context',
      // localStorage key
      storageKey: 'vec-flow-context',
      getKey: item => item.id,
      schema: z.object({ id: flowSchema.shape.id }),
    })
  )

  return flowCollection
}
