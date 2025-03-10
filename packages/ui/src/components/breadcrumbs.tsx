import {
  type BreadcrumbProps,
  type BreadcrumbsProps,
  Breadcrumb as RACBreadcrumb,
  Breadcrumbs as RACBreadcrumbs
} from 'react-aria-components'
import { breadcrumbClassName, breadcrumbsClassName } from './breadcrumb.css'
import { cn } from './utils'

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
  return <RACBreadcrumbs {...props} className={cn(props.className, breadcrumbsClassName)} />
}

export function Breadcrumb(props: BreadcrumbProps) {
  return <RACBreadcrumb {...props} className={cn(props.className, breadcrumbClassName)} />
}
