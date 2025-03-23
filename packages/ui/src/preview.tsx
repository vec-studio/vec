import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Autocomplete } from './components/autocomplete'
import { MenuItem } from './components/menu-item'
import { semanticClassName, themeLightClassName } from './theme.css'

function Components() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName}`}>
      <Autocomplete label="label" placeholder="placeholder">
        <MenuItem>42</MenuItem>
      </Autocomplete>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Components />
  </StrictMode>
)
