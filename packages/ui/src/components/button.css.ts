import { keyframes, style } from '@vanilla-extract/css'
import { semanticVars, themeVars } from '../theme.css'

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
    }
  }
})

export const toggleAnimation = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})
