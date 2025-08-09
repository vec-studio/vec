import { eq, useLiveQuery } from '@tanstack/react-db'
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { type Connection, type EdgeChange, type NodeChange } from '@xyflow/system'
import { type MouseEvent, type RefObject, useCallback, useMemo } from 'react'

import * as schema from 'src/schema'
import { flowNodesEdgesCollection } from 'src/state/flow'

export function useNodesEdges(id: schema.Flow['id']) {
  const { data } = useLiveQuery(q =>
    q.from({ flowNodesEdges: flowNodesEdgesCollection }).where(({ flowNodesEdges }) => eq(flowNodesEdges.flow.id, id))
  )

  const nodes = useMemo(() => data.map(v => v.node.data), data)
  const edges = useMemo(() => data.map(v => v.edge.data), data)

  return { nodes, edges }
}

export function useOnNodesChange() {
  const onNodesChange = useCallback((changes: NodeChange[]) => () => applyNodeChanges(changes, []), [])

  return onNodesChange
}

export function useOnEdgesChange() {
  const onEdgesChange = useCallback((changes: EdgeChange[]) => () => applyEdgeChanges(changes, []), [])

  return onEdgesChange
}

export function useOnConnect() {
  const onConnect = useCallback((params: Connection) => () => addEdge(params, []), [])

  return onConnect
}
