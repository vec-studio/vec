import { Item, Menu } from '@adobe/react-spectrum'
import { createFileRoute } from '@tanstack/react-router'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type MouseEvent, useCallback, useRef, useState } from 'react'
import * as hooks from 'src/hooks'
import { useTranslations } from 'use-intl'

function component() {
  const params = Route.useParams()
  const t = useTranslations()

  const ref = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onPaneClick = useCallback(() => {
    setIsMenuOpen(false)
  }, [])
  const onContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(true)
  }, [])

  const { nodes, edges } = hooks.flow.useNodesEdges(params.id)
  const onNodesChange = hooks.flow.useOnNodesChange()
  const onEdgesChange = hooks.flow.useOnEdgesChange()
  const onConnect = hooks.flow.useOnConnect()

  return (
    <>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onContextMenu={onContextMenu}
        fitView
      />
      {isMenuOpen && (
        <Menu>
          <Item key="add">{t('flow.context-menu.add')}</Item>
        </Menu>
      )}
    </>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout/$id')({
  component
})
