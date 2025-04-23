import { createFileRoute } from '@tanstack/react-router'
import { Graph } from './graph'

function component() {
  return <Graph />
}

export const Route = createFileRoute('/_layout/flow/_layout/')({
  component
})
