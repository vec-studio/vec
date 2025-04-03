import { createFileRoute, Outlet } from '@tanstack/react-router'
import { layoutClassName } from './layout.css'

export const Route = createFileRoute('/_layout/flow/_layout')({
  component() {
    return (
      <div className={layoutClassName}>
        <Outlet />
      </div>
    )
  }
})
