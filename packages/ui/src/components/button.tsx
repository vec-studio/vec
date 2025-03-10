import { ButtonProps, Button as AriaButton } from 'react-aria-components'
import { buttonClassName } from './button.css'
import { cn } from './utils'

export function Button(props: ButtonProps) {
  return <AriaButton {...props} className={cn(props.className, buttonClassName)} />
}
