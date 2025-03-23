import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Autocomplete } from './components/autocomplete'
import { MenuItem } from './components/menu-item'
import { semanticClassName, themeLightClassName } from './theme.css'

function AutocompleteExample() {
  return (
    <Autocomplete label="label" placeholder="placeholder">
      <MenuItem>42</MenuItem>
    </Autocomplete>
  )
}

function Examples() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName}`}>
      <AutocompleteExample />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Examples />
  </StrictMode>
)
