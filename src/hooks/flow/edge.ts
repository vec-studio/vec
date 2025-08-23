import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { addEdge, applyEdgeChanges, useEdges } from '@xyflow/react'
import { type Connection, type EdgeChange } from '@xyflow/system'
import { useCallback } from 'react'
import * as schema from 'src/schema'
import { flowEdgeSchema } from 'src/schema/flow-edge'
import {
  add as addFlowEdgeServerFunction,
  list as listFlowEdgeServerFunction,
  update as updateFlowEdgeServerFunction
} from 'src/server/flow-edge'

// react-flow edges
export function useNodesEdges(flowId: schema.Flow['id']) {
  const flowEdgeCollection = useFlowEdgeCollection(flowId)

  const edgeQuery = useLiveQuery(q => q.from({ edge: flowEdgeCollection }).where(({ edge }) => eq(edge.flowId, flowId)))

  const edges = edgeQuery.data.map(v => v.data)

  return edges
}

// react-flow change edge
export function useOnEdgesChange(flowId: schema.Flow['id']) {
  const edges = useEdges()
  const flowEdgeCollection = useFlowEdgeCollection(flowId)

  const onEdgesChange = useCallback(
    async (changes: EdgeChange[]) => {
      const updateEdges = applyEdgeChanges(changes, edges)
    },
    [edges]
  )

  return onEdgesChange
}

// react-flow edge connect
export function useOnConnect(flowId: schema.Flow['id']) {
  const edges = useEdges()
  const flowEdgeCollection = useFlowEdgeCollection(flowId)

  const onConnect = useCallback(
    async (params: Connection) => {
      const allEdges = addEdge(params, edges)
      const addedEdges = allEdges.filter(edge => edge.source === params.source && edge.target === params.target)

      for (const addedEdge of addedEdges) {
        const tx = flowEdgeCollection.insert({ id: addedEdge.id, data: addedEdge, flowId })
        await tx.isPersisted.promise
      }
    },
    [edges]
  )

  return onConnect
}

// edge tanstack-db collection
export function useFlowEdgeCollection(flowId: schema.Flow['id']) {
  const queryClient = new QueryClient()

  const flowEdgeCollection = createCollection(
    queryCollectionOptions({
      id: 'flow-edge',
      queryClient,
      queryKey: ['flow-edge', flowId],
      queryFn: async () => {
        return await listFlowEdgeServerFunction()
      },
      getKey: item => item.id,
      schema: flowEdgeSchema,
      onInsert: async ({ transaction }) => {
        const { modified } = transaction.mutations[0]
        await addFlowEdgeServerFunction({ data: modified })
      },
      onUpdate: async ({ transaction }) => {
        const { original, modified } = transaction.mutations[0]
        await updateFlowEdgeServerFunction({ data: modified })
      },
      onDelete: async ({ transaction }) => {
        const { original } = transaction.mutations[0]
      }
    })
  )

  return flowEdgeCollection
}
