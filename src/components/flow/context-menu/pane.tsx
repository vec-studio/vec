import { useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { type NodeBase } from '@xyflow/system'
import { nanoid } from 'nanoid'
import { type MouseEventHandler } from 'react'
import { MenuItem } from 'react-aria-components'
import { useAddFunctionNode, useAddNode } from 'src/hooks/flow/node'
import { useTranslations } from 'use-intl'

export function FlowContextMenuPaneMenuItems() {
  const t = useTranslations()
  const addNode = useAddNode()
  const addFunctionNode = useAddFunctionNode()
  const { screenToFlowPosition } = useReactFlow()

  const onClickAddNode: MouseEventHandler = e => {
    const id = nanoid()
    const node: NodeBase = {
      id,
      position: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      }),
      data: { label: '', input: [], output: [], fn: '' },
      origin: [0.5, 0.0] as any
    }
    addNode(node)
  }

  const onClickAddFunctionNode: MouseEventHandler = e => {
    const id = nanoid()
    const node: NodeBase = {
      id,
      type: 'functionNode',
      position: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      }),
      data: { label: '', input: [], output: [], fn: '//' },
      origin: [0.5, 0.0] as any
    }
    addFunctionNode(node)
  }

  return (
    <>
      <MenuItem key="add" onClick={onClickAddNode}>
        {t('flow.context-menu.add')}
      </MenuItem>
      <MenuItem key="add_function" onClick={onClickAddFunctionNode}>
        {t('flow.context-menu.add_function')}
      </MenuItem>
    </>
  )
}
