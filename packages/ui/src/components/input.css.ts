import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { colorFieldClassName } from './color-field.css'
import { searchFieldClassName } from './search-field.css'
import { textFieldClassName } from './text-field.css'

export const inputClassName = style({
  selectors: {
    // text-field
    [`${textFieldClassName} &`]: {
      padding: '0.286rem',
      margin: 0,
      border: `1px solid ${semanticVars.color.borderColor}`,
      borderRadius: '6px',
      background: semanticVars.color.fieldBackground,
      fontSize: '1.143rem',
      color: semanticVars.color.fieldTextColor
    },
    [`${textFieldClassName} &[data-focused]`]: {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    },
    [`${textFieldClassName} &[data-invalid]`]: {
      borderColor: semanticVars.color.invalidColor
    },
    [`${textFieldClassName} &[data-disabled]`]: {
      borderColor: semanticVars.color.borderColorDisabled,
      color: semanticVars.color.textColorDisabled
    },
    // search-field
    [`${searchFieldClassName} &`]: {
      gridArea: 'input',
      padding: '0.286rem 1.714rem 0.286rem 0.286rem',
      margin: 0,
      border: `1px solid ${semanticVars.color.borderColor}`,
      borderRadius: '6px',
      background: semanticVars.color.fieldBackground,
      fontSize: '1.143rem',
      color: semanticVars.color.fieldTextColor,
      outline: 'none'
    },
    [`${searchFieldClassName} &::-webkit-search-cancel-button, ${searchFieldClassName} &::-webkit-search-decoration`]: {
      WebkitAppearance: 'none'
    },
    [`${searchFieldClassName} &::placeholder`]: {
      color: semanticVars.color.textColorPlaceholder,
      opacity: 1
    },
    [`${searchFieldClassName} &[data-focused]`]: {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    },
    [`${searchFieldClassName} &[data-invalid]`]: {
      borderColor: semanticVars.color.invalidColor
    },
    [`${searchFieldClassName} &[data-disabled]`]: {
      borderColor: semanticVars.color.borderColorDisabled,
      color: semanticVars.color.textColorDisabled
    },
    // color field
    [`${colorFieldClassName} &`]: {
      padding: '0.286rem',
      margin: 0,
      border: `1px solid ${semanticVars.color.borderColor}`,
      borderRadius: '6px',
      background: semanticVars.color.fieldBackground,
      fontSize: '1.143rem',
      color: semanticVars.color.fieldBackground,
      width: '100%',
      maxWidth: '12ch',
      boxSizing: 'border-box'
    },
    [`${colorFieldClassName} &[data-focused]`]: {
      outline: `2px solid ${semanticVars.color.focusRingColor}`,
      outlineOffset: '-1px'
    },
    [`${colorFieldClassName}[data-invalid] &`]: {
      borderColor: semanticVars.color.invalidColor
    },
    [`${colorFieldClassName} &[data-disabled]`]: {
      borderColor: semanticVars.color.borderColor,
      color: semanticVars.color.textColorDisabled
    }
  }
})
