import { createFileRoute } from '@tanstack/react-router'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type EdgeBase, type NodeBase } from '@xyflow/system'
import { useState } from 'react'
import * as hooks from 'src/hooks'

function component() {
  const [nodes, setNodes] = useState<NodeBase[]>([])
  const [edges, setEdges] = useState<EdgeBase[]>([])

  const onNodesChange = hooks.flow.useOnNodesChange(setNodes)
  const onEdgesChange = hooks.flow.useOnEdgesChange(setEdges)
  const onConnect = hooks.flow.useOnConnect(setEdges)

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
