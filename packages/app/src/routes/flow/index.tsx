import { createFileRoute } from '@tanstack/react-router'
import { ReactFlow, addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type Connection, type EdgeBase, type EdgeChange, type NodeBase, type NodeChange } from '@xyflow/system'
import { useCallback, useState } from 'react'

function component() {
  const [nodes, setNodes] = useState<NodeBase[]>([])
  const [edges, setEdges] = useState<EdgeBase[]>([])

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(nodesSnapshot => applyNodeChanges(changes, nodesSnapshot)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(edgesSnapshot => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
  const onConnect = useCallback((params: Connection) => setEdges(edgesSnapshot => addEdge(params, edgesSnapshot)), [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component
})
