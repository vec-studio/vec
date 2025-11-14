import { style } from '@vanilla-extract/css'
import openProps from 'open-props'

export const rootClassName = style({
  borderRadius: openProps.radius2,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: openProps.gray0
})

export const contentClassName = style({
  position: 'relative',
  flex: 1,
  backgroundColor: openProps.gray1
})

export const buttonGroupClassName = style({})
