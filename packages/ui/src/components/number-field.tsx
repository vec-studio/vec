import { NumberField as RACNumberField, type NumberFieldProps as RACNumberFieldProps } from 'react-aria-components'
import { numberFieldClassName } from './number-field.css'
import { cn } from './utils'

export type NumberFieldProps = RACNumberFieldProps

export function NumberField(props: NumberFieldProps) {
  return <RACNumberField {...props} className={cn(props.className, numberFieldClassName)} />
}
