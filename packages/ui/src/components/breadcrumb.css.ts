import { style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'

export const breadcrumbsClassName = style({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: '18px',
  color: 'var(--text-color)'
})

export const breadcrumbClassName = style({
  selectors: {
    [`${breadcrumbsClassName} &:not(:last-child)::after`]: {
      content: '›',
      padding: '0 5px'
    }
  }
})

export const breadcrumbLinkClassName = style({
  color: semanticVars.color.linkColorSecondary,
  outline: 'none',
  position: 'relative',
  textDecoration: 'none',
  cursor: 'pointer',

  selectors: {
    '&[data-hovered]': {
      textDecoration: 'underline'
    },
    '&[data-current]': {
      color: 'var(--text-color)',
      fontWeight: 'bold'
    },
    '&[data-focus-visible]::after': {
      content: '',
      position: 'absolute',
      inset: '-2px -4px',
      borderRadius: '6px',
      border: `2px solid ${semanticVars.color.focusRingColor}`
    },
    '&[data-disabled]': {
      cursor: 'default'
    },
    '&[data-disabled]:not([data-current])': {
      color: semanticVars.color.textColorDisabled
    }
  }
})
