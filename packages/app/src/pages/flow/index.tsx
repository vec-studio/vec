import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const Cytoscape = lazy(() => import('./cytoscape'))

export const Route = createFileRoute('/_layout/_layout/flow/')({
  component() {
    return (
      <div>
        <Suspense>
          <Cytoscape />
        </Suspense>
      </div>
    )
  }
})
