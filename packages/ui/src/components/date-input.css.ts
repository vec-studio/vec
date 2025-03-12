import { style } from '@vanilla-extract/css'
import { datePickerClassName } from './date-picker.css'

export const dateInputClassName = style({
  selectors: {
    // date picker
    [`${datePickerClassName} &`]: {
      padding: '4px 2.5rem 4px 8px'
    },
    [`${datePickerClassName}[data-invalid] &`]: {
      content: '🚫',
      flex: 1,
      textAlign: 'end'
    }
  }
})
