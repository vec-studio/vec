import { eq, useLiveQuery } from '@tanstack/react-db'
import { addEdge, applyEdgeChanges, applyNodeChanges, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { type Connection, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import lodash from 'lodash'
import { useCallback, useMemo } from 'react'
import * as schema from 'src/schema'
import { flowEdgeCollection, flowNodeCollection, flowNodeEdgeCollection } from 'src/state/flow'

export function useNodesEdges(flowId: schema.Flow['id']) {
  const { data } = useLiveQuery(q =>
    q.from({ flowNodesEdges: flowNodeEdgeCollection }).where(({ flowNodesEdges }) => eq(flowNodesEdges.flow.id, flowId))
  )

  const nodes = useMemo(() => data.filter(v => v.node).map(v => v.node!.data), [data])
  const edges = useMemo(() => data.filter(v => v.edge).map(v => v.edge!.data), [data])

  return { nodes, edges }
}

export function useOnNodesChange(flowId: schema.Flow['id']) {
  const nodes = useNodes()

  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      const updateNodes = applyNodeChanges(changes, nodes)
      const updateNodeIds = updateNodes.map(v => v.id)

      const tx = flowNodeCollection.update(updateNodeIds, prevNodes => {
        prevNodes.forEach((node, index) => {
          node = lodash.merge({}, node, { flowId, data: updateNodes[index] })
        })
      })

      await tx.isPersisted.promise
    },
    [nodes]
  )

  return onNodesChange
}

export function useOnEdgesChange(flowId: schema.Flow['id']) {
  const edges = useEdges()

  const onEdgesChange = useCallback(
    async (changes: EdgeChange[]) => {
      const updateEdges = applyEdgeChanges(changes, edges)
      const updateEdgeIds = updateEdges.map(v => v.id)

      const tx = flowEdgeCollection.update(updateEdgeIds, prevEdges => {
        prevEdges.forEach((node, index) => {
          node = lodash.merge({}, node, { flowId, data: updateEdges[index] })
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
    (params: Connection) => async () => {
      const updateEdges = addEdge(params, edges)
      const updateEdgeIds = updateEdges.map(v => v.id)

      const tx = flowEdgeCollection.update(updateEdgeIds, prevEdges => {
        prevEdges.forEach((node, index) => {
          node = lodash.merge({}, node, { flowId, data: updateEdges[index] })
        })
      })

      await tx.isPersisted.promise
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
