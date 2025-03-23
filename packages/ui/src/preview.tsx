import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Autocomplete, Button, MenuItem } from './components'
import { previewClassName } from './preview.css'
import { semanticClassName, themeLightClassName } from './theme.css'

function Components() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName} ${previewClassName}`}>
      <div>
        <Autocomplete label="label" placeholder="placeholder">
          <MenuItem>42</MenuItem>
        </Autocomplete>
      </div>
      <div>
        <Button>42</Button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Components />
  </StrictMode>
)
