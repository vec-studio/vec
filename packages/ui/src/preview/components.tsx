import {
  Autocomplete,
  Button,
  GridList,
  GridListItem,
  ListBox,
  ListBoxItem,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup
} from '../components'
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
      <Card title="ToggleButton">
        <ToggleButton>Pin</ToggleButton>
      </Card>
      <Card title="ToggleButtonGroup">
        <ToggleButtonGroup>
          <ToggleButton id="left">Left</ToggleButton>
          <ToggleButton id="center">Center</ToggleButton>
          <ToggleButton id="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Card>
      <Card title="GridList">
        <GridList selectionMode="multiple">
          <GridListItem>Chocolate</GridListItem>
          <GridListItem>Mint</GridListItem>
          <GridListItem>Strawberry</GridListItem>
          <GridListItem>Vanilla</GridListItem>
        </GridList>
      </Card>
      <Card title="ListBox">
        <ListBox selectionMode="single">
          <ListBoxItem>Chocolate</ListBoxItem>
          <ListBoxItem>Mint</ListBoxItem>
          <ListBoxItem>Strawberry</ListBoxItem>
          <ListBoxItem>Vanilla</ListBoxItem>
        </ListBox>
      </Card>
    </div>
  )
}
