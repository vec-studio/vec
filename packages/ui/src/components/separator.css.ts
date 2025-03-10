import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { menuClassName } from './menu.css'

export const separatorClassName = style({
  selectors: {
    // menu
    [`${menuClassName} &`]: {
      height: '1px',
      background: semanticVars.color.borderColor,
      margin: '2px 4px'
    }
  }
})
