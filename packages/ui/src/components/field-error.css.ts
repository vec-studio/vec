import { style } from '@vanilla-extract/css'
import { semanticVars, themeVars } from '../theme.css'
import { textFieldClassName } from './text-field.css'
import { searchFieldClassName } from './search-field.css'

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
    }
  }
})
