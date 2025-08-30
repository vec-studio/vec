import { type Node, type NodeMouseHandler } from '@xyflow/react'
import { type MouseEventHandler, useState } from 'react'

export function useFlowContextMenu() {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    offset: number
    crossOffset: number
  } | null>(null)

  const onContextMenu: MouseEventHandler<Element> = e => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenuPosition({
      offset: e.clientY - rect.bottom,
      crossOffset: e.clientX - rect.left
    })
  }

  const [contextMenuNodeId, setContextMenuNodeId] = useState<string>()

  const onNodeContextMenu: NodeMouseHandler<Node> = (e, node) => {
    onContextMenu(e)
    setContextMenuNodeId(node.id)
  }

  const onPaneClick = () => {
    setContextMenuPosition(null)
    setContextMenuNodeId(undefined)
  }

  return { contextMenuPosition, contextMenuNodeId, onContextMenu, onNodeContextMenu, onPaneClick, setContextMenuPosition, setContextMenuNodeId }
}
