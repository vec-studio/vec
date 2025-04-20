import { type ButtonProps as RACButtonProps, Button as RACButton } from 'react-aria-components'
import { buttonClassName } from './button.css'
import { cn } from './utils'

export function Button(props: RACButtonProps) {
  return <RACButton {...props} className={cn(props.className, buttonClassName)} />
}
