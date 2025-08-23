import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { applyNodeChanges, useNodes, useReactFlow } from '@xyflow/react'
import { type NodeBase, type NodeChange } from '@xyflow/system'
import { useCallback } from 'react'
import * as schema from 'src/schema'
import { flowNodeSchema } from 'src/schema/flow-node'
import {
  add as addFlowNodeServerFunction,
  list as listFlowNodeServerFunction,
  update as updateFlowNodeServerFunction
} from 'src/server/flow-node'

// react-flow nodes
export function useNodesEdges(flowId: schema.Flow['id']) {
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const nodeQuery = useLiveQuery(q => q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowId)))

  const nodes = nodeQuery.data.map(v => v.data)

  return nodes
}

// react-flow change node
export function useOnNodesChange(flowId: schema.Flow['id']) {
  const nodes = useNodes()
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes)
    },
    [nodes]
  )

  return onNodesChange
}

// add node
export function useAddNode(flowId: schema.Flow['id']) {
  const { addNodes } = useReactFlow()
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const addNode = useCallback(async (node: NodeBase) => {
    addNodes(node)

    const tx = flowNodeCollection.insert({ id: node.id, data: node, flowId })
    await tx.isPersisted.promise
  }, [])

  return addNode
}

// add function node
export function useAddFunctionNode(flowId: schema.Flow['id']) {
  const { addNodes } = useReactFlow()
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const addFunctionNode = useCallback(async (node: NodeBase) => {
    addNodes(node)

    const tx = flowNodeCollection.insert({ id: node.id, data: node, flowId })
    await tx.isPersisted.promise
  }, [])

  return addFunctionNode
}

// update function node
export function useUpdateFunctionNode(flowId: schema.Flow['id']) {
  const { updateNode } = useReactFlow()
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const updateFunctionNode = useCallback(async (id: NodeBase['id'], node: Partial<NodeBase>) => {
    updateNode(id, node)

    const tx = flowNodeCollection.update(id, prevNode => {
      for (const k in node.data) {
        prevNode.data!.data[k] = node.data?.[k]
      }
    })

    await tx.isPersisted.promise
  }, [])

  return updateFunctionNode
}

// node tanstack-db collection
export function useFlowNodeCollection(flowId: schema.Flow['id']) {
  const queryClient = new QueryClient()

  const flowNodeCollection = createCollection(
    queryCollectionOptions({
      id: 'flow-node',
      queryClient,
      queryKey: ['flow-node', flowId],
      queryFn: async () => {
        return await listFlowNodeServerFunction({ data: { flowId } })
      },
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
  )

  return flowNodeCollection
}
