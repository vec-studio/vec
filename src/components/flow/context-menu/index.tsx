import { type Dispatch, type RefObject, type SetStateAction } from 'react'
import { Menu, Popover } from 'react-aria-components'
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
  onPaneClick: () => void
}

export function FlowContextMenu(props: FlowContextMenuProps) {
  const onOpenChange = () => {
    props.onPaneClick()
  }

  const onClose = () => {
    props.onPaneClick()
  }

  const isOpen = !!props.position
  const isNodeContextMenu = !!props.nodeId
  const isPaneContextMenu = !props.nodeId

  if (!isOpen) return null

  return (
    <Popover
      crossOffset={props.position?.crossOffset}
      isNonModal={true}
      isOpen={isOpen}
      offset={props.position?.offset}
      onOpenChange={onOpenChange}
      placement="bottom start"
      shouldFlip={false}
      triggerRef={props.ref}
    >
      <Menu aria-label="menu" onClose={onClose}>
        {isPaneContextMenu && <FlowContextMenuPaneMenuItems />}
        {isNodeContextMenu && <FlowContextMenuNodeMenuItems nodeId={props.nodeId!} onClose={onClose} />}
      </Menu>
    </Popover>
  )
}
