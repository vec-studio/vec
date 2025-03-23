import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Autocomplete, Button, MenuItem, ToggleButton, ToggleButtonGroup } from './components'
import {
  previewCardClassName,
  previewCardContentClassName,
  previewCardTitleClassName,
  previewClassName
} from './preview.css'
import { semanticClassName, themeLightClassName } from './theme.css'

function Components() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName}`}>
      <div className={`${previewClassName}`}>
        <div className={previewCardClassName}>
          <div className={previewCardTitleClassName}>Autocomplete</div>
          <div className={previewCardContentClassName}>
            <Autocomplete label="label" placeholder="placeholder">
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
              <MenuItem>Option 3</MenuItem>
            </Autocomplete>
          </div>
        </div>
        <div className={previewCardClassName}>
          <div className={previewCardTitleClassName}>Button</div>
          <div className={previewCardContentClassName}>
            <Button>Press me</Button>
          </div>
        </div>
        <div className={previewCardClassName}>
          <div className={previewCardTitleClassName}>Toggle Button</div>
          <div className={previewCardContentClassName}>
            <ToggleButton>Pin</ToggleButton>
          </div>
        </div>
        <div className={previewCardClassName}>
          <div className={previewCardTitleClassName}>Toggle Button Group</div>
          <div className={previewCardContentClassName}>
            <ToggleButtonGroup>
              <ToggleButton id="left">Left</ToggleButton>
              <ToggleButton id="center">Center</ToggleButton>
              <ToggleButton id="right">Right</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Components />
  </StrictMode>
)
