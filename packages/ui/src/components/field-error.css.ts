import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { searchFieldClassName } from './search-field.css'

export const fieldErrorClassName = style({
  fontSize: '12px',
  color: semanticVars.color.invalidColor,

  selectors: {
    // search-field
    [`${searchFieldClassName} &`]: {
      gridArea: 'help'
    }
  }
})
