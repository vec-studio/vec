import { eq, useLiveQuery } from '@tanstack/react-db'
import { addEdge, applyEdgeChanges, applyNodeChanges, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { type Connection, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import { useCallback } from 'react'
import * as schema from 'src/schema'
import { flowEdgeCollection, flowNodeCollection } from 'src/state/flow'

export function useNodesEdges(flowId: schema.Flow['id']) {
  const nodeQuery = useLiveQuery(q => q.from({ node: flowNodeCollection }).where(({ node }) => eq(node.flowId, flowId)))

  const edgeQuery = useLiveQuery(q => q.from({ edge: flowEdgeCollection }).where(({ edge }) => eq(edge.flowId, flowId)))

  const nodes = nodeQuery.data.map(v => v.data)
  const edges = edgeQuery.data.map(v => v.data)

  return { nodes, edges }
}

export function useOnNodesChange() {
  const nodes = useNodes()

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const updateNodes = applyNodeChanges(changes, nodes)
      const updateNodeIds = updateNodes.map(v => v.id)

      const tx = flowNodeCollection.update(updateNodeIds, prevNodes => {
        prevNodes.forEach((node, index) => {
          node.data = updateNodes[index]
        })
      })

      await tx.isPersisted.promise
    },
    [nodes]
  )

  return onNodesChange
}

export function useOnEdgesChange() {
  const edges = useEdges()

  const onEdgesChange = useCallback(
    async (changes: EdgeChange[]) => {
      const updateEdges = applyEdgeChanges(changes, edges)
      const updateEdgeIds = updateEdges.map(v => v.id)

      const tx = flowEdgeCollection.update(updateEdgeIds, prevEdges => {
        prevEdges.forEach((prevEdge, index) => {
          prevEdge.data = updateEdges[index]
        })
      })

      await tx.isPersisted.promise
    },
    [edges]
  )

  return onEdgesChange
}

export function useOnConnect(flowId: schema.Flow['id']) {
  const edges = useEdges()

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

  const addNode = useCallback(async (node: NodeBase) => {
    addNodes(node)

    const tx = flowNodeCollection.insert({ id: node.id, data: node, flowId })

    await tx.isPersisted.promise
  }, [])

  return addNode
}

export function useFunctionCodeNode(flowId: schema.Flow['id']) {
  const { addNodes } = useReactFlow()

  const addFunctionNode = useCallback(async (node: NodeBase) => {
    addNodes(node)

    const tx = flowNodeCollection.insert({ id: node.id, data: node, flowId })

    await tx.isPersisted.promise
  }, [])

  return addFunctionNode
}
