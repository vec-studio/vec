import { globalStyle, style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'

export const tagGroupClassName = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontSize: 'small',
  color: semanticVars.color.textColor
})

globalStyle(`${tagGroupClassName} & [slot=description]`, {
  fontSize: '12px'
})

globalStyle(`${tagGroupClassName} & [slot=errorMessage]`, {
  fontSize: '12px',
  color: semanticVars.color.invalidColor
})
