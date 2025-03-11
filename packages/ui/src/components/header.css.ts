import { style } from '@vanilla-extract/css'
import { listBoxClassName } from './list-box.css'
import { menuClassName } from './menu.css'

export const headerClassName = style({
  selectors: {
    // menu
    [`${menuClassName} &`]: {
      fontSize: '1.143rem',
      fontWeight: 'bold',
      padding: '0 0.714rem'
    },
    // list box
    [`${listBoxClassName} &`]: {
      fontSize: '1.143rem',
      fontWeight: 'bold',
      padding: '0 0.714rem'
    }
  }
})
