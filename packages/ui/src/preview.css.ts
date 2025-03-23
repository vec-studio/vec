import { globalStyle, style } from '@vanilla-extract/css'

export const previewClassName = style({
  margin: 10,
  display: 'grid',
  gap: 10,
  gridAutoRows: 'max-content',
  gridAutoColumns: 'max-content'
})
