import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { checkboxGroupClassName } from './checkbox-group.css'
import { colorFieldClassName } from './color-field.css'
import { comboBoxClassName } from './combo-box.css'
import { datePickerClassName } from './date-picker.css'
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
    }
  }
})
