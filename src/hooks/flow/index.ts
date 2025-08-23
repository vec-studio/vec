import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import consola from 'consola'
import { nanoid } from 'nanoid'
import * as schema from 'src/schema'
import { add as addFlowServerFunction, list as listFlowServerFunction } from 'src/server/flow'
import { useFlowEdgeCollection } from './edge'
import { useFlowNodeCollection } from './node'
export { useOnConnect, useOnEdgesChange } from './edge'
export { useOnNodesChange, useUpdateFunctionNode } from './node'

export function useNodesEdges(flowId: schema.Flow['id']) {
  const flowNodeCollection = useFlowNodeCollection(flowId)
  const flowEdgeCollection = useFlowEdgeCollection(flowId)

  const nodeQuery = useLiveQuery(q => q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowId)))
  const edgeQuery = useLiveQuery(q => q.from({ edge: flowEdgeCollection }).where(({ edge }) => eq(edge.flowId, flowId)))

  const nodes = nodeQuery.data.map(v => v.data)
  const edges = edgeQuery.data.map(v => v.data)

  return { nodes, edges }
}

export function useAddFlow(flowId: schema.Flow['id']) {
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

export function useFlowCollection(id: schema.Flow['id']) {
  const queryClient = new QueryClient()

  const flowCollection = createCollection(
    queryCollectionOptions({
      id: 'flow',
      queryKey: ['flow', id],
      queryFn: async () => {
        return await listFlowServerFunction({ data: { id } })
      },
      getKey: item => item.id,
      schema: schema.flowSchema,
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
