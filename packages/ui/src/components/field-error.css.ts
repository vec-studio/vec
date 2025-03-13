import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { checkboxGroupClassName } from './checkbox-group.css'
import { colorFieldClassName } from './color-field.css'
import { comboBoxClassName } from './combo-box.css'
import { datePickerClassName } from './date-picker.css'
import { dateRangePickerClassName } from './date-range-picker.css'
import { numberFieldClassName } from './number-field.css'
import { radioGroupClassName } from './radio-group.css'
import { searchFieldClassName } from './search-field.css'
import { selectClassName } from './select.css'
import { textFieldClassName } from './text-field.css'

export const fieldErrorClassName = style({
  selectors: {
    // text-field
    [`${textFieldClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // search-field
    [`${searchFieldClassName} &`]: {
      gridArea: 'help',
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // checkbox group
    [`${checkboxGroupClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // color field
    [`${colorFieldClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    [`${selectClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // combo box
    [`${comboBoxClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // date picker
    [`${datePickerClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // date range picker
    [`${dateRangePickerClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // number field
    [`${numberFieldClassName} &`]: {
      fontSize: '12px',
      color: semanticVars.color.invalidColor
    },
    // radio group
    [`${radioGroupClassName} &`]: {
      fontSize: '12px',
      color: 'var(--invalid-color)'
    }
  }
})
