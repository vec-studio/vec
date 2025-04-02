import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { indexClassName } from './index.css'

const MaxGraph = lazy(() => import('./max-graph'))

export const Route = createFileRoute('/_layout/_layout/flow/')({
  component() {
    return (
      <div className={indexClassName}>
        <Suspense>
          <MaxGraph />
        </Suspense>
      </div>
    )
  }
})
