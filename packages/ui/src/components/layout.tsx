import { semanticClassName, themeLightClassName } from '@vec/ui'
import { type ReactNode } from 'react'
import './layout.css'

export function Layout(props: { children?: ReactNode }) {
  return <div className={`${semanticClassName} ${themeLightClassName}`}>{props.children}</div>
}
