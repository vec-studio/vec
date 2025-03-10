import { style } from '@vanilla-extract/css'
import { autocompleteClassName } from './autocomplete.css'

export const labelClassName = style({
  selectors: {
    // autocomplete
    [`${autocompleteClassName} &`]: {
      marginBottom: '.5em'
    }
  }
})
