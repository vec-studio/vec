import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { useQueryClient } from '@tanstack/react-query'
import { applyNodeChanges, useNodes, useReactFlow } from '@xyflow/react'
import { type NodeBase, type NodeChange } from '@xyflow/system'
import { useCallback, useMemo } from 'react'
import { flowNodeSchema } from 'src/schema/flow-node'
import {
  add as addFlowNodeServerFunction,
  list as listFlowNodeServerFunction,
  update as updateFlowNodeServerFunction
} from 'src/server/flow-node'
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

// react-flow change node
export function useOnNodesChange() {
  const nodes = useNodes()

  const flowContext = useFlowContext()
  const flowNodeCollection = useFlowNodeCollection()

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const changedNodes = applyNodeChanges(changes, nodes)

      for (const change of changes) {
        switch (change.type) {
          case 'add': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)!
            flowNodeCollection.insert({ id: changedNode.id, data: changedNode, flowId: flowContext.id })
            break
          }
          case 'replace': {
            const changedNode = changedNodes.find(v => v.id === change.item.id)!
            flowNodeCollection.update(changedNode.id, prevNode => {
              prevNode.data = changedNode
            })
          }
          default: {
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

// node tanstack-db collection
export function useFlowNodeCollection() {
  const queryClient = useQueryClient()

  const flowContext = useFlowContext()

  const flowNodeCollection = useMemo(
    () =>
      createCollection(
        queryCollectionOptions({
          id: 'flow-node',
          queryClient,
          queryKey: ['flow-node', flowContext.id],
          queryFn: async () => await listFlowNodeServerFunction({ data: { flowId: flowContext.id } }),
          getKey: item => item.id,
          schema: flowNodeSchema,
          onInsert: async ({ transaction }) => {
            const { modified } = transaction.mutations[0]
            await addFlowNodeServerFunction({ data: modified })
          },
          onUpdate: async ({ transaction }) => {
            const { original, modified } = transaction.mutations[0]
            await updateFlowNodeServerFunction({ data: modified })
          },
          onDelete: async ({ transaction }) => {
            const { original } = transaction.mutations[0]
          }
        })
      ),
    [flowContext.id]
  )

  // a new collections doesn't start syncing until you call collection.preload() or you query it
  if (!flowNodeCollection.isReady()) flowNodeCollection.preload()

  return flowNodeCollection
}
