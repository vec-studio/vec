import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useDebouncedCallback } from '@tanstack/react-pacer/debouncer'
import { useQueryClient } from '@tanstack/react-query'
import { addEdge, applyEdgeChanges, useEdges } from '@xyflow/react'
import { type Connection, type EdgeBase, type EdgeChange } from '@xyflow/system'
import { type Dispatch, useCallback, useMemo } from 'react'
import { flowEdgeSchema } from 'src/schema/flow-edge'
import {
  add as addFlowEdgeServerFunction,
  list as listFlowEdgeServerFunction,
  update as updateFlowEdgeServerFunction
} from 'src/server/flow-edge'
import { useFlowContext } from './index'

// react-flow edges
export function useFlowEdges() {
  const flowContext = useFlowContext()
  const flowEdgeCollection = useFlowEdgeCollection()

  const edgeQuery = useLiveQuery(q =>
    q.from({ edge: flowEdgeCollection }).where(({ edge }) => eq(edge.flowId, flowContext.id))
  )
  const edges = edgeQuery.data.map(v => v.data)

  return edges
}

// react-flow change
export function useOnEdgesChange(setEdges: Dispatch<React.SetStateAction<EdgeBase[]>>) {
  const edges = useEdges()
  const flowContext = useFlowContext()
  const flowEdgeCollection = useFlowEdgeCollection()

  const debouncedInsert = useDebouncedCallback(x => flowEdgeCollection.insert(x), {wait: 500})
  const debouncedUpdate = useDebouncedCallback((x, y) => flowEdgeCollection.update(x, y), {wait: 500})

  const onEdgesChange = useCallback(
    async (changes: EdgeChange[]) => {
      const changedEdges = applyEdgeChanges(changes, edges)
      setEdges(changedEdges)

      for (const change of changes) {
        switch (change.type) {
          case 'add': {
            const changedEdge = changedEdges.find(v => v.id === change.item.id)!
            debouncedInsert({ id: changedEdge.id, data: changedEdge, flowId: flowContext.id })
            break
          }
          case 'replace': {
            const changedEdge = changedEdges.find(v => v.id === change.item.id)!
            debouncedUpdate(changedEdge.id, prevEdge => {
              prevEdge.data = changedEdge
            })
            break
          }
          default: {
            const changedEdge = changedEdges.find(v => v.id === change.id)!
            debouncedUpdate(changedEdge.id, prevEdge => {
              prevEdge.data = changedEdge
            })
          }
        }
      }
    },
    [edges, flowContext.id]
  )

  return onEdgesChange
}

// react-flow edge connect
export function useOnConnect() {
  const edges = useEdges()
  const flowContext = useFlowContext()
  const flowEdgeCollection = useFlowEdgeCollection()

  const onConnect = useCallback(
    async (params: Connection) => {
      const allEdges = addEdge(params, edges)
      const addedEdges = allEdges.filter(edge => edge.source === params.source && edge.target === params.target)

      for (const addedEdge of addedEdges) {
        flowEdgeCollection.insert({ id: addedEdge.id, data: addedEdge, flowId: flowContext.id })
      }
    },
    [edges]
  )

  return onConnect
}

// edge tanstack-db collection
export function useFlowEdgeCollection() {
  const queryClient = useQueryClient()
  const flowContext = useFlowContext()

  const flowEdgeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-edge',
          queryClient,
          queryKey: ['flow-edge', flowContext.id],
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
      ),
    [flowContext.id]
  )

  return flowEdgeCollection
}
