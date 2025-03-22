import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'

export const dateSegmentClassName = style({
  padding: '0 2px',
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'end',
  color: semanticVars.color.textColor,

  selectors: {
    '&[data-type=literal]': {},

    '&[data-placeholder]': {
      color: semanticVars.color.textColorPlaceholder,
      fontStyle: 'italic'
    },
    '&:focus': {
      color: semanticVars.color.highlightForeground,
      background: semanticVars.color.highlightForeground,
      outline: 'none',
      borderRadius: '4px',
      caretColor: 'transparent'
    },
    '&[data-invalid]': {
      color: semanticVars.color.invalidColor
    },
    '&[data-invalid]:focus': {
      background: semanticVars.color.highlightBackgroundInvalid,
      color: semanticVars.color.highlightForeground
    }
  }
})
