import {
  DateField as RACDateField,
  DateFieldProps as RACDateFieldProps,
  type DateValue,
  type ValidationResult
} from 'react-aria-components'
import { DateInput } from './date-input'
import { DateSegment } from './date-segment'
import { FieldError } from './field-error'
import { Label } from './label'
import { Text } from './text'

export interface DateFieldProps<T extends DateValue> extends RACDateFieldProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

export function DateField<T extends DateValue>({ label, description, errorMessage, ...props }: DateFieldProps<T>) {
  return (
    <RACDateField {...props}>
      <Label>{label}</Label>
      <DateInput>{segment => <DateSegment segment={segment} />}</DateInput>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </RACDateField>
  )
}
