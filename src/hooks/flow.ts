import { eq, useLiveQuery } from '@tanstack/react-db'
import { addEdge, applyEdgeChanges, applyNodeChanges, useEdges, useNodes, useReactFlow } from '@xyflow/react'
import { type Connection, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import lodash from 'lodash'
import { nanoid } from 'nanoid'
import { useCallback, useMemo } from 'react'
import * as schema from 'src/schema'
import { flowEdgeCollection, flowNodeCollection, flowNodeEdgeCollection } from 'src/state/flow'

export function useNodesEdges(id: schema.Flow['id']) {
  const { data } = useLiveQuery(q =>
    q.from({ flowNodesEdges: flowNodeEdgeCollection }).where(({ flowNodesEdges }) => eq(flowNodesEdges.flow.id, id))
  )

  const nodes = useMemo(() => data.map(v => v.node.data), data)
  const edges = useMemo(() => data.map(v => v.edge.data), data)

  return { nodes, edges }
}

export function useOnNodesChange() {
  const nodes = useNodes()

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => async () => {
      const updateNodes = applyNodeChanges(changes, nodes)
      const updateNodeIds = updateNodes.map(v => v.id)

      const tx = flowNodeCollection.update(updateNodeIds, prevNodes => {
        prevNodes.forEach((node, index) => {
          node = lodash.merge({}, node, { data: updateNodes[index] })
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
    (changes: EdgeChange[]) => async () => {
      const updateEdges = applyEdgeChanges(changes, edges)
      const updateEdgeIds = updateEdges.map(v => v.id)

      const tx = flowEdgeCollection.update(updateEdgeIds, prevEdges => {
        prevEdges.forEach((node, index) => {
          node = lodash.merge({}, node, { data: updateEdges[index] })
        })
      })

      await tx.isPersisted.promise
    },
    [edges]
  )

  return onEdgesChange
}

export function useOnConnect() {
  const edges = useEdges()

  const onConnect = useCallback(
    (params: Connection) => async () => {
      const updateEdges = addEdge(params, edges)
      const updateEdgeIds = updateEdges.map(v => v.id)

      const tx = flowEdgeCollection.update(updateEdgeIds, prevEdges => {
        prevEdges.forEach((node, index) => {
          node = lodash.merge({}, node, { data: updateEdges[index] })
        })
      })

      await tx.isPersisted.promise
    },
    [edges]
  )

  return onConnect
}

export function useAddNode() {
  const { addNodes } = useReactFlow()

  const addNode = useCallback(
    (flowId: schema.Flow['id'], node: NodeBase) => async () => {
      addNodes(node)

      const tx = flowNodeCollection.insert({ id: nanoid(), data: node, flowId })

      await tx.isPersisted.promise
    },
    []
  )

  return addNode
}
