import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'

export const colorPickerClassName = style({
  background: 'none',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  outline: 'none',
  borderRadius: '4px',
  appearance: 'none',
  verticalAlign: 'middle',
  fontSize: '1rem',
  color: semanticVars.color.textColor,

  selectors: {
    '&[data-focus-visible]': {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '2px'
    }
  }
})

export const colorPickerDialogClassName = style({
  outline: 'none',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  minWidth: '192px',
  maxHeight: 'inherit',
  boxSizing: 'border-box',
  overflow: 'auto'
})
