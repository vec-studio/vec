import { createFileRoute } from '@tanstack/react-router'
import { Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type EdgeBase, type NodeBase } from '@xyflow/system'
import { useRef, useState } from 'react'
import { FlowContextMenu } from '../../components/flow/context-menu'
import { nodeTypes } from '../../components/flow/node'
import { useOnConnect, useOnEdgesChange, useOnNodesChange } from '../../hooks/flow'
import { useFlowContextMenu } from '../../hooks/flow/context-menu'
import { useFlowEdgesFirstLoad } from '../../hooks/flow/edge'
import { useFlowNodesFirstLoad } from '../../hooks/flow/node'
import * as classNames from './id.css'

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

  const {
    contextMenuPosition,
    onContextMenu,
    onNodeContextMenu,
    onPaneClick,
    setContextMenuPosition,
    contextMenuNodeId
  } = useFlowContextMenu()

  return (
    <div ref={ref} className={classNames.rootClassName}>
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
      <FlowContextMenu
        nodeId={contextMenuNodeId}
        flowId={params.id}
        position={contextMenuPosition}
        ref={ref}
        updatePosition={setContextMenuPosition}
        onPaneClick={onPaneClick}
      />
      <ReactFlow
        aria-haspopup="menu"
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onContextMenu={onContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        ref={ref}
      />
    </div>
  )
}

function FlowIdPage() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/$id')({
  component: FlowIdPage
})
