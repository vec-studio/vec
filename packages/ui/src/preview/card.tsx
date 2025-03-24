import { type ReactNode } from 'react'
import { cardClassName, cardContentClassName, cardTitleClassName } from './card.css'

export function Card(props: { title: string; children: ReactNode }) {
  return (
    <div className={cardClassName}>
      <div className={cardTitleClassName}>{props.title}</div>
      <div className={cardContentClassName}>{props.children}</div>
    </div>
  )
}
