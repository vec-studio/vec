import { globalStyle } from '@vanilla-extract/css'
import { themeVars } from '../theme.css'

globalStyle('body', {
  background: themeVars.color.backgroundColor,
  fontFamily: 'system-ui',
  fontSize: 14,
  lineHeight: 1.5,
  margin: 0
})
