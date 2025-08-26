import '@xyflow/react/dist/style.css'

import { createFileRoute } from '@tanstack/react-router'
import { Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import { type EdgeBase, type NodeBase } from '@xyflow/system'
import { type MouseEventHandler, useRef, useState } from 'react'
import { FlowContextMenu } from 'src/components/flow/context-menu'
import { nodeTypes } from 'src/components/flow/node'
import { useOnConnect, useOnEdgesChange, useOnNodesChange } from 'src/hooks/flow'
import { useFlowEdgesFirstLoad } from 'src/hooks/flow/edge'
import { useFlowNodesFirstLoad } from 'src/hooks/flow/node'

function Flow() {
  const params = Route.useParams()
  const ref = useRef<HTMLDivElement>(null)

  const [nodes, setNodes] = useState<NodeBase[]>([])
  const [edges, setEdges] = useState<EdgeBase[]>([])

  useFlowNodesFirstLoad(setNodes)
  useFlowEdgesFirstLoad(setEdges)

  const onNodesChange = useOnNodesChange(setNodes)
  const onEdgesChange = useOnEdgesChange(setEdges)
  const onConnect = useOnConnect()

  const [contextMenuPosition, setContextMenuPosition] = useState<{
    offset: number
    crossOffset: number
  } | null>(null)

  const onContextMenu: MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuPosition({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
  }

  const onPaneClick = () => setContextMenuPosition(null)

  return (
    <>
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
      <FlowContextMenu
        flowId={params.id}
        position={contextMenuPosition}
        ref={ref}
        updatePosition={setContextMenuPosition}
      />
      <ReactFlow
        aria-haspopup="menu"
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onContextMenu={onContextMenu}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        ref={ref}
      />
    </>
  )
}

function component() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/$id')({
  component
})
