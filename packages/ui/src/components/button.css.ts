import { keyframes, style } from '@vanilla-extract/css'
import { semanticVars, themeVars } from '../theme.css'
import { searchFieldClassName } from './search-field.css'

export const buttonClassName = style({
  color: semanticVars.color.textColor,
  background: semanticVars.color.buttonBackground,
  border: `1px solid ${semanticVars.color.borderColor}`,
  borderRadius: '4px',
  appearance: 'none',
  verticalAlign: 'middle',
  fontSize: '1rem',
  textAlign: 'center',
  margin: 0,
  outline: 'none',
  padding: '6px 10px',
  textDecoration: 'none',

  selectors: {
    '&[data-pressed]': {
      boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 0.1)',
      background: semanticVars.color.buttonBackgroundPressed,
      borderColor: semanticVars.color.borderColorPressed
    },
    '&[data-focus-visible]': {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    },
    '&[data-disabled]': {
      borderColor: semanticVars.color.borderColorDisabled,
      color: semanticVars.color.textColorDisabled
    },
    // seach-field
    [`${searchFieldClassName} &`]: {
      gridArea: 'button',
      width: '1.143rem',
      height: '1.143rem',
      borderRadius: '1.143rem',
      marginLeft: '-1.429rem',
      fontSize: '0.857rem',
      lineHeight: '0.857rem',
      verticalAlign: 'middle',
      textAlign: 'center',
      background: themeVars.color.gray500,
      color: themeVars.color.gray50,
      border: 'none',
      padding: 0
    },
    [`${searchFieldClassName} &[data-pressed]`]: {
      background: themeVars.color.gray600
    }
  }
})

export const toggleAnimation = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})
