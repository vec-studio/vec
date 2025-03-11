import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { checkboxGroupClassName } from './checkbox-group.css'
import { searchFieldClassName } from './search-field.css'
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
    }
  }
})
