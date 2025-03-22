import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { dateFieldClassName } from './date-field.css'
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
    },
    // date field
    [`${dateFieldClassName} &`]: {
      display: 'inline',
      padding: '4px',
      border: `1px solid ${semanticVars.color.borderColor}`,
      borderRadius: '6px',
      background: semanticVars.color.fieldBackground,
      width: 'fit-content',
      minWidth: '150px',
      whiteSpace: 'nowrap',
      forcedColorAdjust: 'none'
    },
    [`${dateFieldClassName} &[data-focus-within]`]: {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    }
  }
})
