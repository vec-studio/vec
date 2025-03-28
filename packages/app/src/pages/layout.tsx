import { createFileRoute, Outlet } from '@tanstack/react-router'
import { semanticClassName, themeLightClassName } from '@vec/ui'
import { clsx } from 'clsx'
import { layoutClassName } from './layout.css'

export const Route = createFileRoute('/_layout')({
  component() {
    return (
      <div className={clsx(semanticClassName, themeLightClassName, layoutClassName)}>
        <Outlet />
      </div>
    )
  }
})
