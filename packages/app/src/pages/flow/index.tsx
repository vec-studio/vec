import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { indexClassName } from './index.css'

const Cytoscape = lazy(() => import('./cytoscape'))

export const Route = createFileRoute('/_layout/_layout/flow/')({
  component() {
    return (
      <div className={indexClassName}>
        <Suspense>
          <Cytoscape />
        </Suspense>
      </div>
    )
  }
})
