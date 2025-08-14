import { useReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { nanoid } from 'nanoid'
import { type Dispatch, type MouseEventHandler, type RefObject, type SetStateAction } from 'react'
import { Menu, MenuItem, Popover } from 'react-aria-components'
import * as hooks from 'src/hooks'
import { useTranslations } from 'use-intl'

interface FlowContextMenuProps<
  T = {
    offset: number
    crossOffset: number
  } | null
> {
  flowId: string
  ref?: RefObject<Element | null>
  position?: T
  updatePosition: Dispatch<SetStateAction<T>>
}

export function FlowContextMenu(props: FlowContextMenuProps) {
  const t = useTranslations()

  const onPaneClick = () => props.updatePosition(null)
  const onOpenChange = onPaneClick
  const onClose = onPaneClick

  const { screenToFlowPosition } = useReactFlow()
  const addNode = hooks.flow.useAddNode(props.flowId)

  const onClickAddNode: MouseEventHandler = e => {
    const id = nanoid()
    const node = {
      id,
      position: screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      }),
      data: { label: '' },
      origin: [0.5, 0.0] as any
    }
    addNode(node)
  }

  return (
    <Popover
      crossOffset={props.position?.crossOffset}
      isNonModal={true}
      isOpen={!!props.position}
      offset={props.position?.offset}
      onOpenChange={onOpenChange}
      placement="bottom start"
      shouldFlip={false}
      triggerRef={props.ref}
    >
      <Menu aria-label="menu" onClose={onClose}>
        <MenuItem key="add" onClick={onClickAddNode}>
          {t('flow.context-menu.add')}
        </MenuItem>
      </Menu>
    </Popover>
  )
}
