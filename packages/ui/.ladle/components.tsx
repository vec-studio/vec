import { type GlobalProvider } from '@ladle/react'
import { semanticClassName, themeLightClassName } from '../src/theme.css'

export const Provider: GlobalProvider = ({ children, globalState, storyMeta }) => (
  <div className={`${themeLightClassName} ${semanticClassName}`}>{children}</div>
)
