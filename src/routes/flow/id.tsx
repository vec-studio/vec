import { createFileRoute } from '@tanstack/react-router'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type MouseEventHandler, useRef, useState } from 'react'
import { FlowContextMenu } from 'src/components/flow/context-menu'
import { nodeTypes } from 'src/components/flow/node'
import { useFlowEdges, useFlowNodes, useOnConnect, useOnEdgesChange, useOnNodesChange } from 'src/hooks/flow'

function Flow() {
  const params = Route.useParams()
  const ref = useRef<HTMLDivElement>(null)

  const initialNodes = useFlowNodes()
  const initialEdges = useFlowEdges()

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

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
