import { style } from '@vanilla-extract/css'
import { colorAreaClassName } from './color-area.css'

export const colorThumbClassName = style({
  border: '2px solid white',
  boxShadow: '0 0 0 1px black, inset 0 0 0 1px black',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  boxSizing: 'border-box',
  selectors: {
    '&[data-focus-visible]': {
      width: '24px',
      height: '24px'
    },
    [`${colorAreaClassName}[data-disabled] &`]: {
      background: 'gray !important'
    }
  }
})
