import { style } from '@vanilla-extract/css'

export const componentsClassName = style({
  display: 'grid',
  gap: '1rem',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min-content, 20rem))'
})
