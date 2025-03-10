import { globalStyle, style } from '@vanilla-extract/css'
import { semanticVars } from '../theme.css'
import { popoverClassName } from './popover.css'

export const searchFieldClassName = style({
  display: 'grid',
  gridTemplateAreas: `"label label"
                      "input button"
                      "help  help"`,
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  width: 'fit-content',
  color: semanticVars.color.textColor
})

globalStyle(`${searchFieldClassName}[data-empty] button`, {
  display: 'none'
})

globalStyle(`${searchFieldClassName} [slot=description]`, {
  gridArea: 'help',
  fontSize: '12px'
})

// menu
globalStyle(`${popoverClassName}[data-trigger=SubmenuTrigger] ${searchFieldClassName}`, {
  margin: '4px 8px'
})
