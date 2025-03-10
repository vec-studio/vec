import { style } from '@vanilla-extract/css'

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
