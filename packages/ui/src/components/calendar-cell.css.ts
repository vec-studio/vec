import { globalStyle, style } from '@vanilla-extract/css'
import { semanticVars, themeVars } from '../theme.css'
import { calendarClassName } from './calendar.css'

export const calendarCellClassName = style({
  // calendar
  [`${calendarClassName} &`]: {
    width: '2rem',
    lineHeight: '2rem',
    textAlign: 'center',
    borderRadius: '6px',
    cursor: 'default',
    outline: 'none',
    margin: '1px',
    forcedColorAdjust: 'none'
  },
  [`${calendarClassName} &[data-outside-month]`]: {
    display: 'none'
  },
  [`${calendarClassName} &[data-pressed]`]: {
    background: themeVars.color.gray100
  },
  [`${calendarClassName} &[data-focus-visible]`]: {
    outline: `2px solid ${semanticVars.color.focusRingColor}`,
    outlineOffset: '2px'
  },
  [`${calendarClassName} &[data-selected]`]: {
    background: semanticVars.color.highlightBackground,
    color: semanticVars.color.highlightForeground
  },
  [`${calendarClassName} &[data-disabled]`]: {
    color: semanticVars.color.textColorDisabled
  },
  [`${calendarClassName} &[data-unavailable]`]: {
    textDecoration: 'line-through',
    color: semanticVars.color.invalidColor
  },
  [`${calendarClassName} &[data-invalid]`]: {
    background: semanticVars.color.invalidColor,
    color: semanticVars.color.highlightForeground
  }
})

globalStyle(`${calendarClassName} [slot=errorMessage]`, {
  fontSize: '12px',
  color: semanticVars.color.invalidColor
})
