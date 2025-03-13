import { style } from '@vanilla-extract/css'
import { datePickerClassName } from './date-picker.css'
import { dateRangePickerClassName } from './date-range-picker.css'

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
    },
    // date range picker
    [`${dateRangePickerClassName} &`]: {
      width: 'unset',
      minWidth: 'unset',
      padding: 'unset',
      border: 'unset',
      outline: 'unset'
    }
  }
})
