import {
  type Key,
  Autocomplete as RACAutocomplete,
  type AutocompleteProps as RACAutocompleteProps,
  useFilter
} from 'react-aria-components'
import { autocompleteClassName } from './autocomplete.css'
import { Menu } from './menu'
import { SearchField } from './search-field'

export interface AutocompleteProps<T extends object> extends Omit<RACAutocompleteProps, 'children'> {
  label?: string
  placeholder?: string
  items?: Iterable<T>
  children: React.ReactNode | ((item: T) => React.ReactNode)
  onAction?: (id: Key) => void
}

export function Autocomplete<T extends object>({
  label,
  placeholder,
  items,
  children,
  onAction,
  ...props
}: AutocompleteProps<T>) {
  let { contains } = useFilter({ sensitivity: 'base' })
  return (
    <div className={autocompleteClassName}>
      <RACAutocomplete filter={contains} {...props}>
        <SearchField label={label} placeholder={placeholder} />
        <Menu items={items} onAction={onAction}>
          {children}
        </Menu>
      </RACAutocomplete>
    </div>
  )
}
