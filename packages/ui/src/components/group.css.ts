import { style } from '@vanilla-extract/css'
import { datePickerClassName } from './date-picker.css'

export const groupClassName = style({
  selectors: {
    // date picker
    [`${datePickerClassName} &`]: {
      display: 'flex',
      width: 'fit-content',
      alignItems: 'center'
    }
  }
})
