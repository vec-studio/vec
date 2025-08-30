import '@xyflow/react/dist/style.css'
import { type MouseEventHandler } from 'react'
import { MenuItem } from 'react-aria-components'
import { useDeleteFunctionNode } from 'src/hooks/flow/node'
import { useTranslations } from 'use-intl'

export function FlowContextMenuNodeMenuItems(props: { nodeId: string }) {
  const t = useTranslations()

  const deleteFunctionNode = useDeleteFunctionNode()

  const onClickDeleteNode: MouseEventHandler = e => {
    if (!props.nodeId) return
    e.preventDefault()
    deleteFunctionNode(props.nodeId)
  }

  return (
    <>
      <MenuItem key="add" onClick={onClickDeleteNode}>
        {t('flow.context-menu.delete')}
      </MenuItem>
    </>
  )
}
