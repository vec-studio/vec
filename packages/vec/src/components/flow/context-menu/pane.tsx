import { useReactFlow } from '@xyflow/react'
import { type NodeBase } from '@xyflow/system'
import { nanoid } from 'nanoid'
import { type MouseEventHandler } from 'react'
import { MenuItem, type MenuItemProps } from 'react-aria-components'
import { useCreateFunctionNode, useCreateNode } from '~/src/hooks/flow/node'
import { useTranslations } from 'use-intl'

export function FlowContextMenuPaneMenuItems() {
  const t = useTranslations()
  const createNode = useCreateNode()
  const createFunctionNode = useCreateFunctionNode()
  const { screenToFlowPosition } = useReactFlow()

  const onClickCreateNode: MouseEventHandler = e => {
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
    createNode(node)
  }

  const onClickCreateFunctionNode: MouseEventHandler = e => {
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
    createFunctionNode(node)
  }

  const menuItemPropsList: (MenuItemProps & { locale: string })[] = [
    {
      locale: 'flow.context-menu.create',
      onClick: onClickCreateNode
    },
    {
      locale: 'flow.context-menu.create_function',
      onClick: onClickCreateFunctionNode
    }
  ]

  return menuItemPropsList.map((menuItemProps, index) => (
    <MenuItem onClick={menuItemProps.onClick} key={index}>
      {t(menuItemProps.locale)}
    </MenuItem>
  ))
}
