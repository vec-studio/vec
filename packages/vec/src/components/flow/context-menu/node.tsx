import { type MouseEventHandler } from 'react'
import { MenuItem } from 'react-aria-components'
import { useRemoveFunctionNode } from '~/src/hooks/flow/node'
import { useTranslations } from 'use-intl'

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
