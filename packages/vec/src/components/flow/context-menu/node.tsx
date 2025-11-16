import { type MouseEventHandler } from 'react'
import { MenuItem } from 'react-aria-components'
import { useTranslations } from 'use-intl'
import { useRemoveFunctionNode } from '../../../hooks/flow/node'

interface FlowContextMenuNodeMenuItemsProps {
  nodeId: string
  onClose: () => void
}

export function FlowContextMenuNodeMenuItems(props: FlowContextMenuNodeMenuItemsProps) {
  const t = useTranslations()

  const removeFunctionNode = useRemoveFunctionNode()

  const onClickRemoveNode: MouseEventHandler = e => {
    if (!props.nodeId) return
    e.preventDefault()
    removeFunctionNode(props.nodeId)
    props.onClose()
  }

  return (
    <>
      <MenuItem onClick={onClickRemoveNode}>{t('flow.context-menu.remove')}</MenuItem>
    </>
  )
}
