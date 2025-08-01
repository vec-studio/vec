import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import { type Connection, type EdgeBase, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import { Dispatch, SetStateAction, useCallback } from 'react'

export function useOnNodesChange(setNodes: Dispatch<SetStateAction<NodeBase[]>>) {
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
    []
  )

  return onNodesChange
}

export function useOnEdgesChange(setEdges: Dispatch<SetStateAction<EdgeBase[]>>) {
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(edgesSnapshot => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )

  return onEdgesChange
}

export function useOnConnect(setEdges: Dispatch<SetStateAction<EdgeBase[]>>) {
  const onConnect = useCallback((params: Connection) => setEdges(edgesSnapshot => addEdge(params, edgesSnapshot)), [])

  return onConnect
}
