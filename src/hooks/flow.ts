import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { createCollection, eq, useLiveQuery } from '@tanstack/react-db'
import { QueryClient } from '@tanstack/react-query'
import { addEdge, applyEdgeChanges, applyNodeChanges, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { type Connection, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import consola from 'consola'
import { nanoid } from 'nanoid'
import { useCallback } from 'react'
import * as schema from 'src/schema'
import { flowEdgeSchema } from 'src/schema/flow-edge'
import { flowNodeSchema } from 'src/schema/flow-node'
import { add as addFlowServerFunction, list as listFlowServerFunction } from 'src/server/flow'
import {
  add as addFlowEdgeServerFunction,
  list as listFlowEdgeServerFunction,
  update as updateFlowEdgeServerFunction
} from 'src/server/flow-edge'
import {
  add as addFlowNodeServerFunction,
  list as listFlowNodeServerFunction,
  update as updateFlowNodeServerFunction
} from 'src/server/flow-node'

export function useNodesEdges(flowId: schema.Flow['id']) {
  const flowNodeCollection = useFlowNodeCollection(flowId)
  const flowEdgeCollection = useFlowEdgeCollection(flowId)

  const nodeQuery = useLiveQuery(q => q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowId)))
  const edgeQuery = useLiveQuery(q => q.from({ edge: flowEdgeCollection }).where(({ edge }) => eq(edge.flowId, flowId)))

  const nodes = nodeQuery.data.map(v => v.data)
  const edges = edgeQuery.data.map(v => v.data)

  return { nodes, edges }
}

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

export function useUpdateFunctionNode(flowId: schema.Flow['id']) {
  const { updateNode } = useReactFlow()
  const flowNodeCollection = useFlowNodeCollection(flowId)

  const updateFunctionNode = useCallback(async (id: NodeBase['id'], node: Partial<NodeBase>) => {
    updateNode(id, node)

    const tx = flowNodeCollection.update(id, prevNode => {
      for (const k in node.data) {
        prevNode.data.data[k] = node.data?.[k]
      }
    })

    await tx.isPersisted.promise
  }, [])

  return updateFunctionNode
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
