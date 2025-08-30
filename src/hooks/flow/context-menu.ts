import { type Node, type NodeMouseHandler } from '@xyflow/react'
import { type MouseEventHandler, useRef, useState } from 'react'

export function useFlowContextMenu() {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    offset: number
    crossOffset: number
  } | null>(null)
  const [contextMenuNodeId, setContextMenuNodeId] = useState<string>()
  const currentContextMenuRegion = useRef<'node' | 'pane'>('pane')

  const onContextMenu: MouseEventHandler<Element> = e => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuPosition({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
    currentContextMenuRegion.current = 'pane'
    if (currentContextMenuRegion.current === 'pane') setContextMenuNodeId(undefined)
  }

  const onNodeContextMenu: NodeMouseHandler<Node> = (e, node) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuPosition({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
    setContextMenuNodeId(node.id)
    currentContextMenuRegion.current = 'node'
  }

  const onPaneClick = () => {
    setContextMenuPosition(null)
    setContextMenuNodeId(undefined)
  }

  return {
    contextMenuPosition,
    contextMenuNodeId,
    onContextMenu,
    onNodeContextMenu,
    onPaneClick,
    setContextMenuPosition,
    setContextMenuNodeId
  }
}
