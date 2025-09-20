import { createFileRoute, Outlet } from '@tanstack/react-router'

function component() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout')({
  component
})
