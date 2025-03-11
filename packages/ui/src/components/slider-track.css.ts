import { style } from '@vanilla-extract/css'
import { colorSliderClassName } from './color-slider.css'

export const sliderTrackClassName = style({
  selectors: {
    // color slider
    [`${colorSliderClassName} &`]: {
      gridArea: 'track',
      borderRadius: '4px'
    },
    [`${colorSliderClassName}[data-orientation=horizontal] &`]: {
      height: '28px'
    },
    [`${colorSliderClassName}[data-orientation=vertical] &`]: {
      width: '28px',
      height: '100%'
    },
    [`${colorSliderClassName}[data-disabled] &`]: {
      background: 'gray !important'
    }
  }
})
