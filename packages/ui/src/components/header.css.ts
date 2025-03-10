import { style } from '@vanilla-extract/css'
import { menuClassName } from './menu.css'

export const headerClassName = style({
  selectors: {
    [`${menuClassName} &`]: {
      fontSize: '1.143rem',
      fontWeight: 'bold',
      padding: '0 0.714rem'
    }
  }
})
