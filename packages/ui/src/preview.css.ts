import { globalStyle, style } from '@vanilla-extract/css'

export const previewClassName = style({
  margin: 10,
  display: 'grid',
  gap: 10,
  gridAutoFlow: 'column',
  gridTemplateRows: 'max-content',
  gridTemplateColumns: 'max-content'
})

export const previewCardClassName = style({
  padding: 30,
  boxShadow: '0 0 10px #eee',
  borderRadius: 5
})

export const previewCardTitleClassName = style({
  marginBottom: 10
})

export const previewCardContentClassName = style({})
