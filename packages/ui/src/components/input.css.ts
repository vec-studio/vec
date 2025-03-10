import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { textFieldClassName } from './text-field.css'

export const inputClassName = style({
  selectors: {
    [`${textFieldClassName} &`]: {
      padding: '0.286rem',
      margin: 0,
      border: `1px solid ${semanticVars.color.borderColor}`,
      borderRadius: '6px',
      background: semanticVars.color.fieldBackground,
      fontSize: '1.143rem',
      color: semanticVars.color.fieldTextColor
    },
    [`${textFieldClassName} &[data-focused]`]: {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    },
    [`${textFieldClassName} &[data-invalid]`]: {
      borderColor: semanticVars.color.invalidColor
    },
    [`${textFieldClassName} &[data-disabled]`]: {
      borderColor: semanticVars.color.borderColorDisabled,
      color: semanticVars.color.textColorDisabled
    }
  }
})
