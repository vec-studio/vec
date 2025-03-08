import { createFileRoute, Outlet } from '@tanstack/react-router'
import { semanticClassName, themeLightClassName } from '@vec/ui'

export const Route = createFileRoute('/_layout')({
  component() {
    return (
      <div className={`${semanticClassName} ${themeLightClassName}`}>
        <Outlet />
      </div>
    )
  }
})
