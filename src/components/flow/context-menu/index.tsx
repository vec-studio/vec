import '@xyflow/react/dist/style.css'
import { type Dispatch, type RefObject, type SetStateAction } from 'react'
import { Menu, Popover } from 'react-aria-components'
import { useTranslations } from 'use-intl'
import { FlowContextMenuNodeMenuItems } from './node'
import { FlowContextMenuPaneMenuItems } from './pane'

interface FlowContextMenuProps<
  T = {
    offset: number
    crossOffset: number
  } | null
> {
  nodeId?: string
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

  const isNodeContextMenu = !!props.nodeId
  const isPaneContextMenu = !props.nodeId

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
        {isPaneContextMenu && <FlowContextMenuPaneMenuItems />}
        {isNodeContextMenu && <FlowContextMenuNodeMenuItems nodeId={props.nodeId!} />}
      </Menu>
    </Popover>
  )
}
