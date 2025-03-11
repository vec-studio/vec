import { ColorThumb as RACColorThumb, ColorThumbProps as RACColorThumbProps } from 'react-aria-components'
import { cn } from './utils'
import { colorAreaClassName } from './color-area.css'

export type ColorThumbProps = RACColorThumbProps

export function ColorThumb(props: ColorThumbProps) {
  return <RACColorThumb {...props} className={cn(props.className, colorAreaClassName)} />
}
