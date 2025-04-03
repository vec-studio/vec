import { createFileRoute } from '@tanstack/react-router'
import { indexClassName } from './index.css'
import { Graph } from './graph'

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component() {
    return (
      <div className={indexClassName}>
        <Graph />
      </div>
    )
  }
})
