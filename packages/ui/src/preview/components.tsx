import { Autocomplete, Button, MenuItem, ToggleButton, ToggleButtonGroup } from '../components'
import { Card } from './card'
import { componentsClassName } from './components.css'

export function Components() {
  return (
    <div className={`${componentsClassName}`}>
      <Card title="Autocomplete">
        <Autocomplete label="label" placeholder="placeholder">
          <MenuItem>Option 1</MenuItem>
          <MenuItem>Option 2</MenuItem>
          <MenuItem>Option 3</MenuItem>
        </Autocomplete>
      </Card>
      <Card title="Button">
        <Button>Press me</Button>
      </Card>
      <Card title="Toggle Button">
        <ToggleButton>Pin</ToggleButton>
      </Card>
      <Card title="Toggle Button Group">
        <ToggleButtonGroup>
          <ToggleButton id="left">Left</ToggleButton>
          <ToggleButton id="center">Center</ToggleButton>
          <ToggleButton id="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Card>
    </div>
  )
}
