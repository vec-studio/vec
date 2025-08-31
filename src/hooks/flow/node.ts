import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useAsyncDebouncedCallback } from '@tanstack/react-pacer/async-debouncer'
import { useQueryClient } from '@tanstack/react-query'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { applyNodeChanges, useNodes, useReactFlow } from '@xyflow/react'
import { type NodeBase, type NodeChange } from '@xyflow/system'
import { type Dispatch, useCallback, useMemo } from 'react'
import { flowNodeSchema } from 'src/schema/flow-node'
import {
  addFlowNodeServerFunction,
  deleteFlowNodeServerFunction,
  listFlowNodeServerFunction,
  updateFlowNodeServerFunction
} from 'src/server/flow/node'
import { z } from 'zod'
import { useFlowContext } from './index'

// react-flow nodes
export function useFlowNodes() {
  const flowContext = useFlowContext()
  const flowNodeCollection = useFlowNodeCollection()

  const nodeQuery = useLiveQuery(q =>
    q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowContext.id))
  )

  const nodes = nodeQuery.data.map(v => v.data)

  return nodes
}

// react-flow node loads first time
export function useFlowNodesFirstLoad(setNodes: Dispatch<React.SetStateAction<NodeBase[]>>) {
  const isFirstRender = useIsFirstRender()

  const flowNodeCollection = useFlowNodeCollection()

  if (isFirstRender) {
    flowNodeCollection.onFirstReady(() => {
      const data = Array.from(flowNodeCollection.state, ([k, v]) => v.data)
      setNodes(data)
    })
  }
}

// react-flow change node
export function useOnNodesChange(setNodes: Dispatch<React.SetStateAction<NodeBase[]>>) {
  const nodes = useNodes()
  const flowContext = useFlowContext()
  const flowNodeCollection = useFlowNodeCollection()

  const debouncedUpdate = useAsyncDebouncedCallback<
    <T extends typeof flowNodeCollection.update<NodeBase>>(
      id: Parameters<T>[0],
      callback: Parameters<T>[2]
    ) => Promise<ReturnType<T> | unknown>
  >(async (id, callback) => {
    if (!flowNodeCollection.has(id as string)) return
    flowNodeCollection.update(id, callback)
  }, { wait: 500 })

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const changedNodes = applyNodeChanges(changes, nodes)
      setNodes(changedNodes)

      for (const change of changes) {
        switch (change.type) {
          case 'add': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)
            if (!changedNode) break
            flowNodeCollection.insert({ id: changedNode.id, data: changedNode, flowId: flowContext.id })
            break
          }
          case 'replace': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)
            if (!changedNode) break
            debouncedUpdate(changedNode.id, prevNode => {
              prevNode.data = changedNode
            })
            break
          }
          case 'remove': {
            flowNodeCollection.delete(change.id)
            break
          }
          default: {
            const changedNode = changedNodes.find(v => v.id === change.id)
            if (!changedNode) break
            debouncedUpdate(changedNode.id, prevNode => {
              prevNode.data = changedNode
            })
          }
        }
      }
    },
    [nodes, flowContext.id]
  )

  return onNodesChange
}

// add node
export function useAddNode() {
  const { addNodes } = useReactFlow()

  const addNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return addNode
}

// add function node
export function useAddFunctionNode() {
  const { addNodes } = useReactFlow()

  const addFunctionNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return addFunctionNode
}

// update function node data
export function useUpdateFunctionNodeData() {
  const { updateNode } = useReactFlow()

  const updateFunctionNodeData = useCallback(async (id: NodeBase['id'], node: Partial<NodeBase>) => {
    updateNode(id, node)
  }, [])

  return updateFunctionNodeData
}

// delete function node
export function useDeleteFunctionNode() {
  const { deleteElements } = useReactFlow()
  const deleteFunctionNode = useCallback(async (id: NodeBase['id']) => {
    deleteElements({ nodes: [{ id }] })
  }, [])

  return deleteFunctionNode
}

// node tanstack-db collection
export function useFlowNodeCollection() {
  const queryClient = useQueryClient()
  const isFirstRender = useIsFirstRender()
  const flowContext = useFlowContext()

  const flowNodeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-node',
          queryClient,
          queryKey: ['flow-node', flowContext.id],
          queryFn: async () => {
            const a1 = await listFlowNodeServerFunction({ data: { flowId: flowContext.id } })
            const a2 = z.array(flowNodeSchema).parse(a1)
            return a2
          },
          getKey: item => item.id,
          schema: flowNodeSchema,
          onInsert: async ({ transaction, collection }) => {
            const { modified } = transaction.mutations[0]
            const o = await addFlowNodeServerFunction({ data: modified })
            collection.utils.writeInsert(o)
            return { refetch: false }
          },
          onUpdate: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await updateFlowNodeServerFunction({ data: modified })
            return { refetch: false }
          },
          onDelete: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await deleteFlowNodeServerFunction({ data: { id: modified.id, flowId: flowContext.id } })
            return { refetch: false }
          }
        })
      ),
    [flowContext.id]
  )

  // a new collections doesn't start syncing until you call collection.preload() or you query it
  if (isFirstRender) flowNodeCollection.preload()

  return flowNodeCollection
}
