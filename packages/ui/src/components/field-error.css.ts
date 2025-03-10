import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { textFieldClassName } from './text-field.css'

export const fieldErrorClassName = style({
  selectors: {
    [`${textFieldClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    }
  }
})
