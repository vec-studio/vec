import { createFileRoute, Outlet } from '@tanstack/react-router'

function TableLayout() {
  return <Outlet />
}

export const Route = createFileRoute('/_layout/table/_layout')({
  component: TableLayout
})
