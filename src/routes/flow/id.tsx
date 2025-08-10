import { createFileRoute } from '@tanstack/react-router'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type MouseEventHandler, useRef, useState } from 'react'
import { Popover, MenuItem, Menu } from 'react-aria-components'
import * as hooks from 'src/hooks'
import { useTranslations } from 'use-intl'

function component() {
  const params = Route.useParams()
  const t = useTranslations()

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

  const { nodes, edges } = hooks.flow.useNodesEdges(params.id)
  const onNodesChange = hooks.flow.useOnNodesChange(nodes)
  const onEdgesChange = hooks.flow.useOnEdgesChange(edges)
  const onConnect = hooks.flow.useOnConnect(edges)

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
          <MenuItem key="add">{t('flow.context-menu.add')}</MenuItem>
        </Menu>
      </Popover>
    </>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/$id')({
  component
})
