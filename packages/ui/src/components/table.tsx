import {
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Button,
  Cell,
  Collection,
  type ColumnProps,
  type RowProps,
  type TableHeaderProps,
  type TableProps,
  useTableOptions
} from 'react-aria-components'
import { Checkbox } from './checkbox'
import { tableClassName } from './table.css'
import { cn } from './utils'

export function Table(props: TableProps) {
  return <AriaTable {...props} className={cn(props.className, tableClassName)} />
}

export function Column(props: ColumnProps) {
  return (
    <AriaColumn {...props} className={cn(props.className, tableClassName)}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === 'ascending' ? '▲' : '▼'}
            </span>
          )}
        </>
      )}
    </AriaColumn>
  )
}

export function TableHeader<T extends object>({ columns, children, className }: TableHeaderProps<T>) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()

  return (
    <AriaTableHeader className={cn(className, tableClassName)}>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <AriaColumn />}
      {selectionBehavior === 'toggle' && (
        <AriaColumn>{selectionMode === 'multiple' && <Checkbox slot="selection" />}</AriaColumn>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaTableHeader>
  )
}

export function Row<T extends object>({ id, columns, children, ...otherProps }: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions()

  return (
    <AriaRow id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  )
}
