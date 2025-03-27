import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_layout')({
  component() {
    return (
      <div>
        <Outlet />
      </div>
    )
  }
})
