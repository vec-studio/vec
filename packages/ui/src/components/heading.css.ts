import { style } from '@vanilla-extract/css'
import { dialogClassName } from './dialog.css'

export const headingClassName = style({
  selectors: {
    [`${dialogClassName} &`]: {
      lineHeight: '1em',
      marginTop: '0'
    }
  }
})
