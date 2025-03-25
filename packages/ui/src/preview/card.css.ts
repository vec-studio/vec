import { globalStyle, style } from '@vanilla-extract/css'
import { semanticVars, themeVars } from '../theme.css'

export const cardClassName = style({
  borderRadius: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '15rem',
  padding: '1rem',
  backgroundColor: 'rgb(250, 250, 250)'
})

export const cardTitleClassName = style({
  fontWeight: '700',
  lineHeight: '1.3',
  marginBottom: '1rem'
})

export const cardContentClassName = style({
  borderRadius: '0.285rem',
  flex: 1,
  padding: '1rem'
})

globalStyle(`${cardClassName} hr`, {
  display: 'none',
  backgroundColor: themeVars.color.gray100,
  blockSize: '0.285rem',
  border: 'none',
  borderRadius: '0.142rem',
  marginBottom: '1rem',
  width: '100%'
})
