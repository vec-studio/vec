import {
  Menu as RACMenu,
  MenuProps as RACMenuProps,
  MenuTrigger as RACMenuTrigger,
  MenuTriggerProps as RACMenuTriggerProps
} from 'react-aria-components'
import { Button } from './button'
import { menuClassName } from './menu.css'
import { Popover } from './popover'
import { cn } from './utils'

export interface MenuButtonProps<T> extends RACMenuProps<T>, Omit<RACMenuTriggerProps, 'children'> {
  label?: string
}

export function MenuButton<T extends object>({ label, children, ...props }: MenuButtonProps<T>) {
  return (
    <RACMenuTrigger {...props}>
      <Button>{label}</Button>
      <Popover>
        <RACMenu {...props} className={cn(props.className, menuClassName)}>
          {children}
        </RACMenu>
      </Popover>
    </RACMenuTrigger>
  )
}
