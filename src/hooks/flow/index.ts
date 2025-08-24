import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, localStorageCollectionOptions, useLiveQuery } from '@tanstack/react-db'
import { useQueryClient } from '@tanstack/react-query'
import consola from 'consola'
import { nanoid } from 'nanoid'
import { useMemo } from 'react'
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
      await flowContextCollection.insert({ id }).isPersisted.promise
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

  const flowCollection = useMemo(
    () =>
      createCollection(
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
      ),
    [flowContext?.id]
  )

  return flowCollection
}

export function useFlowContext() {
  const flowContextCollection = useFlowContextCollection()
  const flowContextQuery = useLiveQuery(q => q.from({ flowContext: flowContextCollection }))
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
      onInsert: async () => {
        // keep only one flowContext record
        window.localStorage.clear()
      }
    })
  )

  return flowCollection
}
