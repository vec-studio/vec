import { createFileRoute } from '@tanstack/react-router'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type MouseEventHandler, useRef, useState } from 'react'
import { FlowContextMenu } from 'src/components/flow/context-menu'
import * as hooks from 'src/hooks'
import { flowCollection } from 'src/state/flow'

function Flow() {
  const params = Route.useParams()

  const isFirstRender = useIsFirstRender()
  if (isFirstRender) flowCollection.insert({ id: params.id })

  const ref = useRef<HTMLDivElement>(null)

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

  const { nodes, edges } = hooks.flow.useNodesEdges(params.id)
  const onNodesChange = hooks.flow.useOnNodesChange()
  const onEdgesChange = hooks.flow.useOnEdgesChange()
  const onConnect = hooks.flow.useOnConnect(params.id)

  return (
    <>
      <ReactFlow
        aria-haspopup="menu"
        edges={edges}
        fitView
        nodes={nodes}
        onConnect={onConnect}
        onContextMenu={onContextMenu}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        ref={ref}
      />
      <FlowContextMenu
        flowId={params.id}
        ref={ref}
        position={contextMenuPosition}
        updatePosition={setContextMenuPosition}
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
