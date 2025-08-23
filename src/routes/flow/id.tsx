import { createFileRoute } from '@tanstack/react-router'
import { Background, BackgroundVariant, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type MouseEventHandler, useEffect, useRef, useState } from 'react'
import { FlowContextMenu } from 'src/components/flow/context-menu'
import { nodeTypes } from 'src/components/flow/node'
import {
  useFlowContextCollection,
  useFlowEdges,
  useFlowNodes, useOnConnect,
  useOnEdgesChange,
  useOnNodesChange
} from 'src/hooks/flow'

function Flow() {
  const params = Route.useParams()
  const ref = useRef<HTMLDivElement>(null)

  const flowContextCollection = useFlowContextCollection()

  useEffect(() => {
    flowContextCollection.insert({ id: params.id })
    return () => {
      flowContextCollection.cleanup()
    }
  }, [params.id])

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

  const nodes = useFlowNodes(params.id)
  const edges = useFlowEdges(params.id)
  const onNodesChange = useOnNodesChange(params.id)
  const onEdgesChange = useOnEdgesChange(params.id)
  const onConnect = useOnConnect(params.id)

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
