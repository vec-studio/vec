import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Autocomplete, Button, MenuItem } from './components'
import { semanticClassName, themeLightClassName } from './theme.css'

function Components() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName}`}>
      <Autocomplete label="label" placeholder="placeholder">
        <MenuItem>42</MenuItem>
      </Autocomplete>
      <Button>42</Button>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Components />
  </StrictMode>
)
