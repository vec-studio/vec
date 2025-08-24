import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, localStorageCollectionOptions, useLiveQuery } from '@tanstack/react-db'
import { useQueryClient } from '@tanstack/react-query'
import consola from 'consola'
import { nanoid } from 'nanoid'
import { flowSchema } from 'src/schema/flow'
import { add as addFlowServerFunction, list as listFlowServerFunction } from 'src/server/flow'
import z from 'zod'
export { useFlowEdges, useOnConnect, useOnEdgesChange } from './edge'
export { useFlowNodes, useOnNodesChange, useUpdateFunctionNodeData } from './node'

export function useAddFlow() {
  const flowContextCollection = useFlowContextCollection()
  const flowCollection = useFlowCollection()

  const addFlow = async () => {
    try {
      const id = nanoid()
      await flowContextCollection.cleanup()
      await flowContextCollection.insert({ id, createdAt: Date.now() }).isPersisted.promise
      await flowCollection.insert({ id }).isPersisted.promise
      return id
    } catch (err) {
      consola.error(err)
    }
  }
  return addFlow
}

export function useFlowCollection() {
  const queryClient = useQueryClient()

  const flowContext = useFlowContext()

  const flowCollection = createCollection(
    queryCollectionOptions({
      id: 'flow',
      queryKey: ['flow', flowContext?.id],
      queryFn: async () => {
        return await listFlowServerFunction({ data: { id: flowContext?.id } })
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
  const flowContextQuery = useLiveQuery(q => q.from({ flowContext: flowContextCollection }).orderBy(({flowContext}) => flowContext.createdAt, 'desc').limit(1))
  return flowContextQuery.data[0] || null
}

export function useFlowContextCollection() {
  const flowCollection = createCollection(
    localStorageCollectionOptions({
      id: 'flow-context',
      // localStorage key
      storageKey: 'vec-flow-context',
      getKey: item => item.id,
      schema: z.object({ id: flowSchema.shape.id, createdAt: z.number() })
    })
  )

  return flowCollection
}
