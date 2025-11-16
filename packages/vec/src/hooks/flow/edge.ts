import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useAsyncDebouncedCallback } from '@tanstack/react-pacer/async-debouncer'
import { useQueryClient } from '@tanstack/react-query'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { addEdge, applyEdgeChanges, useEdges, useReactFlow } from '@xyflow/react'
import { type Connection, type EdgeBase, type EdgeChange } from '@xyflow/system'
import { nanoid } from 'nanoid'
import { type Dispatch, useCallback, useMemo } from 'react'
import { z } from 'zod'
import { flowEdgeSchema } from '../../schema/flow-edge'
import {
  createFlowEdgeServerFn,
  listFlowEdgeServerFn,
  removeFlowEdgeServerFn,
  updateFlowEdgeServerFn
} from '../../server/flow/edge'
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

// react-flow edge loads first time
export function useFlowEdgesFirstLoad(setEdges: Dispatch<React.SetStateAction<EdgeBase[]>>) {
  const isFirstRender = useIsFirstRender()

  const flowEdgeCollection = useFlowEdgeCollection()

  if (isFirstRender) {
    flowEdgeCollection.onFirstReady(() => {
      const data = Array.from(flowEdgeCollection.state, ([k, v]) => v.data)
      setEdges(data)
    })
  }
}

// react-flow change
export function useOnEdgesChange(setEdges: Dispatch<React.SetStateAction<EdgeBase[]>>) {
  const edges = useEdges()
  const flowContext = useFlowContext()
  const flowEdgeCollection = useFlowEdgeCollection()

  const onEdgesChange = useCallback(
    async (changes: EdgeChange[]) => {
      const changedEdges = applyEdgeChanges(changes, edges)
      setEdges(changedEdges)

      for (const change of changes) {
        switch (change.type) {
          case 'add': {
            const changedEdge = changedEdges.find(v => v.id === change.item.id)
            if (!changedEdge) break
            flowEdgeCollection.insert({
              id: changedEdge.id,
              data: changedEdge,
              flowId: flowContext.id
            })
            break
          }
          case 'replace': {
            const changedEdge = changedEdges.find(v => v.id === change.item.id)
            if (!changedEdge) break
            flowEdgeCollection.update(changedEdge.id, prevEdge => {
              prevEdge.data = changedEdge
            })
            break
          }
          case 'remove': {
            flowEdgeCollection.delete(change.id)
            break
          }
          default: {
            const changedEdge = changedEdges.find(v => v.id === change.id)
            if (!changedEdge) break
            flowEdgeCollection.update(changedEdge.id, prevEdge => {
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
  const { addEdges } = useReactFlow()

  const onConnect = useCallback(
    async (params: Connection) => {
      const changedEdges = addEdge({ ...params, id: nanoid() }, edges)
      addEdges(changedEdges)
    },
    [edges]
  )

  return onConnect
}

// edge tanstack-db collection
export function useFlowEdgeCollection() {
  const queryClient = useQueryClient()
  const isFirstRender = useIsFirstRender()
  const flowContext = useFlowContext()

  const updateFlowEdgeServerFnDebounced = useAsyncDebouncedCallback(updateFlowEdgeServerFn, { wait: 500 })
  const removeFlowEdgeServerFnDebounced = useAsyncDebouncedCallback(removeFlowEdgeServerFn, { wait: 500 })

  const flowEdgeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-edge',
          queryClient,
          queryKey: ['flow-edge', flowContext.id],
          queryFn: async () => {
            const a1 = await listFlowEdgeServerFn()
            const a2 = z.array(flowEdgeSchema).parse(a1)
            return a2
          },
          getKey: item => item.id,
          schema: flowEdgeSchema,
          onInsert: async ({ transaction, collection }) => {
            const { modified } = transaction.mutations[0]
            const o = await createFlowEdgeServerFn({ data: modified })
            collection.utils.writeInsert(o)
            return { refetch: false }
          },
          onUpdate: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await updateFlowEdgeServerFnDebounced({ data: modified })
            return { refetch: false }
          },
          onDelete: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await removeFlowEdgeServerFnDebounced({ data: { id: modified.id } })
            return { refetch: false }
          }
        })
      ),
    [flowContext.id]
  )

  // a new collections doesn't start syncing until you call collection.preload() or you query it
  if (isFirstRender) flowEdgeCollection.preload()

  return flowEdgeCollection
}
