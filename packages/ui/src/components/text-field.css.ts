import { style, globalStyle } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'

export const textFieldClassName = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  color: semanticVars.color.textColor
})

globalStyle(`${textFieldClassName} [slot=description]`, {
  fontSize: '12px'
})
