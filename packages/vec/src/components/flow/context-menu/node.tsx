import { type MouseEventHandler } from 'react'
import { MenuItem } from 'react-aria-components'
import { useDeleteFunctionNode } from 'src/hooks/flow/node'
import { useTranslations } from 'use-intl'

interface FlowContextMenuNodeMenuItemsProps {
  nodeId: string
  onClose: () => void
}

export function FlowContextMenuNodeMenuItems(props: FlowContextMenuNodeMenuItemsProps) {
  const t = useTranslations()

  const deleteFunctionNode = useDeleteFunctionNode()

  const onClickDeleteNode: MouseEventHandler = e => {
    if (!props.nodeId) return
    e.preventDefault()
    deleteFunctionNode(props.nodeId)
    props.onClose()
  }

  return (
    <>
      <MenuItem key="add" onClick={onClickDeleteNode}>
        {t('flow.context-menu.delete')}
      </MenuItem>
    </>
  )
}
