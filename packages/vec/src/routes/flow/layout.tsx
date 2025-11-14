import { createFileRoute, Outlet } from '@tanstack/react-router'
import * as classNames from './layout.css'

function FlowLayout() {
  return (
    <div className={classNames.rootClassName}>
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/_layout/flow/_layout')({
  component: FlowLayout
})
