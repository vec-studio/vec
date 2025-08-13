import { createFileRoute } from '@tanstack/react-router'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nanoid } from 'nanoid'
import { type MouseEventHandler, useRef, useState } from 'react'
import { Menu, MenuItem, Popover } from 'react-aria-components'
import * as hooks from 'src/hooks'
import { flowCollection } from 'src/state/flow'
import { useTranslations } from 'use-intl'

function Flow() {
  const params = Route.useParams()
  const t = useTranslations()

  const isFirstRender = useIsFirstRender()
  if (isFirstRender) flowCollection.insert({ id: params.id })

  const ref = useRef<HTMLDivElement>(null)

  const [menuPosition, setMenuPosition] = useState<{
    offset: number
    crossOffset: number
  } | null>(null)

  const onContextMenu: MouseEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setMenuPosition({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
  }

  const onPaneClick = () => setMenuPosition(null)
  const onOpenChange = onPaneClick
  const onClose = onPaneClick

  const { screenToFlowPosition } = useReactFlow()
  const { nodes, edges } = hooks.flow.useNodesEdges(params.id)
  const onNodesChange = hooks.flow.useOnNodesChange()
  const onEdgesChange = hooks.flow.useOnEdgesChange()
  const onConnect = hooks.flow.useOnConnect(params.id)
  const addNode = hooks.flow.useAddNode(params.id)

  const onClickAddNode: MouseEventHandler = e => {
    const id = nanoid()
    const node = {
      id,
      position: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      }),
      data: { label: `Node ${id}` },
      origin: [0.5, 0.0] as any
    }
    addNode(node)
  }

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
      <Popover
        crossOffset={menuPosition?.crossOffset}
        isNonModal={true}
        isOpen={!!menuPosition}
        offset={menuPosition?.offset}
        onOpenChange={onOpenChange}
        placement="bottom start"
        shouldFlip={false}
        triggerRef={ref}
      >
        <Menu aria-label="menu" onClose={onClose}>
          <MenuItem key="add" onClick={onClickAddNode}>
            {t('flow.context-menu.add')}
          </MenuItem>
        </Menu>
      </Popover>
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
