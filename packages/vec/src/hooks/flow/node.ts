import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useAsyncDebouncedCallback } from '@tanstack/react-pacer'
import { useQueryClient } from '@tanstack/react-query'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { applyNodeChanges, useNodes, useReactFlow } from '@xyflow/react'
import { type NodeBase, type NodeChange } from '@xyflow/system'
import { type Dispatch, useCallback, useMemo } from 'react'
import { z } from 'zod'
import { flowNodeSchema } from '~/src/schema/flow-node'
import {
  createFlowNodeServerFn,
  listFlowNodeServerFn,
  removeFlowNodeServerFn,
  updateFlowNodeServerFn
} from '~/src/server/flow/node'
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
            flowNodeCollection.update(changedNode.id, prevNode => {
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
            flowNodeCollection.update(changedNode.id, prevNode => {
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

/** create node */
export function useCreateNode() {
  const { addNodes } = useReactFlow()

  const createNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return createNode
}

/** create function node */
export function useCreateFunctionNode() {
  const { addNodes } = useReactFlow()

  const createFunctionNode = useCallback(async (node: NodeBase) => {
    addNodes(node)
  }, [])

  return createFunctionNode
}

// update function node data
export function useUpdateFunctionNodeData() {
  const { updateNode } = useReactFlow()

  const updateFunctionNodeData = useCallback(async (id: NodeBase['id'], node: Partial<NodeBase>) => {
    updateNode(id, node)
  }, [])

  return updateFunctionNodeData
}

/** function node */
export function useRemoveFunctionNode() {
  const { deleteElements } = useReactFlow()
  const removeFunctionNode = useCallback(async (id: NodeBase['id']) => {
    deleteElements({ nodes: [{ id }] })
  }, [])

  return removeFunctionNode
}

// node tanstack-db collection
export function useFlowNodeCollection() {
  const queryClient = useQueryClient()
  const isFirstRender = useIsFirstRender()
  const flowContext = useFlowContext()

  const updateFlowNodeServerFnDebounced = useAsyncDebouncedCallback(updateFlowNodeServerFn, { wait: 500 })
  const removeFlowNodeServerFnDebounced = useAsyncDebouncedCallback(removeFlowNodeServerFn, { wait: 500 })

  const flowNodeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-node',
          queryClient,
          queryKey: ['flow-node', flowContext.id],
          queryFn: async () => {
            const a1 = await listFlowNodeServerFn({ data: { flowId: flowContext.id } })
            const a2 = z.array(flowNodeSchema).parse(a1)
            return a2
          },
          getKey: item => item.id,
          schema: flowNodeSchema,
          onInsert: async ({ transaction, collection }) => {
            const { modified } = transaction.mutations[0]
            const o = await createFlowNodeServerFn({ data: modified })
            collection.utils.writeInsert(o)
            return { refetch: false }
          },
          onUpdate: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await updateFlowNodeServerFnDebounced({ data: modified })
            return { refetch: false }
          },
          onDelete: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await removeFlowNodeServerFnDebounced({ data: { id: modified.id } })
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
