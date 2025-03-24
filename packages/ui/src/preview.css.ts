import { globalStyle, style } from '@vanilla-extract/css'

export const previewClassName = style({
  margin: '1rem',
  display: 'grid',
  gap: '1rem',
  gridAutoFlow: 'row',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min-content, 20rem))'
})

export const previewCardClassName = style({
  padding: '1rem',
  boxShadow: '0 0 .5rem #eee',
  borderRadius: '.5rem'
})

export const previewCardTitleClassName = style({
  marginBottom: '.5rem'
})

export const previewCardContentClassName = style({})
