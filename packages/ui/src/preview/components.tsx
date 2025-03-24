import { Cell, TableBody } from 'react-aria-components'
import {
  Autocomplete,
  Button,
  Column,
  GridList,
  GridListItem,
  ListBox,
  ListBoxItem,
  Menu,
  MenuItem,
  Row,
  Table,
  TableHeader,
  Tag,
  TagGroup,
  ToggleButton,
  ToggleButtonGroup
} from '../components'
import { Card } from './card'
import { componentsClassName } from './components.css'

export function Components() {
  return (
    <div className={`${componentsClassName}`}>
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
      <Card title="Menu">
        <Menu label="Edit">
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </Menu>
      </Card>
      <Card title="Table" style={{ width: '25rem' }}>
        <Table aria-label="Files" selectionMode="multiple">
          <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column>Type</Column>
            <Column>Date Modified</Column>
          </TableHeader>
          <TableBody>
            <Row>
              <Cell>Games</Cell>
              <Cell>File folder</Cell>
              <Cell>6/7/2020</Cell>
            </Row>
            <Row>
              <Cell>Program Files</Cell>
              <Cell>File folder</Cell>
              <Cell>4/7/2021</Cell>
            </Row>
            <Row>
              <Cell>bootmgr</Cell>
              <Cell>System file</Cell>
              <Cell>11/20/2010</Cell>
            </Row>
            <Row>
              <Cell>log.txt</Cell>
              <Cell>Text Document</Cell>
              <Cell>1/18/2016</Cell>
            </Row>
          </TableBody>
        </Table>
      </Card>
      <Card title="TagGroup">
        <TagGroup selectionMode="multiple">
          <Tag>Chocolate</Tag>
          <Tag>Mint</Tag>
          <Tag>Strawberry</Tag>
          <Tag>Vanilla</Tag>
        </TagGroup>
      </Card>
      <Card title="Autocomplete">
        <Autocomplete label="Commands" placeholder="Search commands...">
          <MenuItem>Create new file...</MenuItem>
          <MenuItem>Create new folder...</MenuItem>
          <MenuItem>Assign to...</MenuItem>
          <MenuItem>Assign to me</MenuItem>
          <MenuItem>Change status...</MenuItem>
          <MenuItem>Change priority...</MenuItem>
          <MenuItem>Add label...</MenuItem>
          <MenuItem>Remove label...</MenuItem>
        </Autocomplete>
      </Card>
    </div>
  )
}
