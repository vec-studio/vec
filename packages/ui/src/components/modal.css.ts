import { createVar, keyframes, style } from '@vanilla-extract/css'

export const modalFade = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

export const modalZoom = keyframes({
  from: {
    transform: 'scale(0.8)'
  },
  to: {
    transform: 'scale(1)'
  }
})

export const modalOverlayVisualViewportHeightVar = createVar()

export const modalOverlayClassName = style({
  vars: {
    [modalOverlayVisualViewportHeightVar]: 'auto'
  },

  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: modalOverlayVisualViewportHeightVar,
  background: 'rgba(0 0 0 / .5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,

  selectors: {
    '&[data-entering]': {
      animation: `${modalFade} 200ms`
    },
    '&[data-exiting]': {
      animation: `${modalFade} 150ms reverse ease-in`
    }
  }
})

export const modalClassName = style({
  boxShadow: '0 8px 20px rgba(0 0 0 / 0.1)',
  borderRadius: '6px',
  background: 'var(--overlay-background)',
  color: 'var(--text-color)',
  border: '1px solid var(--gray-400)',
  outline: 'none',
  maxWidth: '300px',

  selectors: {
    '&[data-entering]': {
      animation: `${modalZoom} 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`
    }
  }
})
