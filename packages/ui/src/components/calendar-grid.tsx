import { CalendarGrid as RACCalendarGrid, type CalendarGridProps as RACCalendarGridProps } from 'react-aria-components'
import { calendarGridClassName } from './calendar-grid.css'
import { cn } from './utils'

export type CalendarProps = RACCalendarGridProps

export function CalendarGrid(props: CalendarProps) {
  return <RACCalendarGrid {...props} className={cn(props.className, calendarGridClassName)} />
}
