import { ThemeState, type GlobalProvider } from '@ladle/react'
import { semanticClassName, themeDarkClassName, themeLightClassName } from '../src/theme.css'

export const Provider: GlobalProvider = ({ children, globalState, storyMeta }) => (
  <div
    className={`${globalState.theme === ThemeState.Light ? themeLightClassName : themeDarkClassName} ${semanticClassName}`}
  >
    {children}
  </div>
)
