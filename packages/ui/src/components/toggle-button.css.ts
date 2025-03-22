import { style } from '@vanilla-extract/css'
import { toolbarClassName } from './toolbar.css'

export const toggleButtonClassName = style({
  selector: {
    [`${toolbarClassName} &`]: {
      width: '32px'
    }
  }
})
