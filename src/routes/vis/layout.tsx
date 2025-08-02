import { createFileRoute, Outlet } from '@tanstack/react-router'

function component() {
  return <Outlet />
}

export const Route = createFileRoute('/_layout/vis/_layout')({
  component
})
