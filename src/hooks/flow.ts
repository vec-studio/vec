import { eq, useLiveQuery } from '@tanstack/react-db'
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { type Connection, type EdgeBase, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import { useCallback, useMemo } from 'react'
import * as schema from 'src/schema'
import { flowNodeEdgeCollection } from 'src/state/flow'

export function useNodesEdges(id: schema.Flow['id']) {
  const { data } = useLiveQuery(q =>
    q.from({ flowNodesEdges: flowNodeEdgeCollection }).where(({ flowNodesEdges }) => eq(flowNodesEdges.flow.id, id))
  )

  const nodes = useMemo(() => data.map(v => v.node.data), data)
  const edges = useMemo(() => data.map(v => v.edge.data), data)

  return { nodes, edges }
}

export function useOnNodesChange(nodes: NodeBase[]) {
  const onNodesChange = useCallback((changes: NodeChange[]) => () => applyNodeChanges(changes, nodes), [nodes])

  return onNodesChange
}

export function useOnEdgesChange(edges: EdgeBase[]) {
  const onEdgesChange = useCallback((changes: EdgeChange[]) => () => applyEdgeChanges(changes, edges), [edges])

  return onEdgesChange
}

export function useOnConnect(edges: EdgeBase[]) {
  const onConnect = useCallback((params: Connection) => () => addEdge(params, edges), [edges])

  return onConnect
}

export function useAddNode() {
  const addNode = useCallback(() => {}, [])

  return addNode
}
