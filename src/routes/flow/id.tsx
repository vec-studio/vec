import { eq, useLiveQuery } from '@tanstack/react-db'
import { createFileRoute } from '@tanstack/react-router'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type EdgeBase, type NodeBase } from '@xyflow/system'
import { useState } from 'react'
import * as hooks from 'src/hooks'
import * as schema from 'src/schema'
import { flowNodesEdgesCollection } from 'src/state/flow'

function component() {
  const params = Route.useParams()

  const [nodes, setNodes] = useState<NodeBase[]>([])
  const [edges, setEdges] = useState<EdgeBase[]>([])

  const { data } = useLiveQuery(q =>
    q
      .from({ flowNodesEdges: flowNodesEdgesCollection })
      .where(({ flowNodesEdges }) => eq(flowNodesEdges.flow.id, params.id))
  )

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

export const Route = createFileRoute('/_layout/flow/_layout/$id')({
  component
})
