import { style } from '@vanilla-extract/css'

export function cn<T>(className1: string | ((props: T) => string) | undefined, className2: string) {
  let className
  if (className1 === undefined) className = className2
  else if (typeof className1 === 'string') className = style([className1, className2])
  else if (typeof className1 === 'function') className = (props: T) => style([className1(props), className2])
  return className
}
