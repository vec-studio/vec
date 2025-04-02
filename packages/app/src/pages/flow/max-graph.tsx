import { use, useEffect, useRef } from 'react'
import { maxGraphClassName } from './max-graph.css'

async function loadMaxGraph() {
  if (typeof window === 'undefined') return null
  const { Graph } = await import('@maxgraph/core')
  return Graph
}

export default function MaxGraph() {
  const Graph = use(loadMaxGraph())
  const maxGraphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!Graph) return
    new Graph(maxGraphContainerRef.current!)
  }, [])

  return <div ref={maxGraphContainerRef} className={maxGraphClassName}></div>
}
