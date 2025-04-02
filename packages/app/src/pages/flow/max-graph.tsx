import { type Graph } from '@maxgraph/core'
import { useEffect, useRef } from 'react'
import { maxGraphClassName } from './max-graph.css'

export default function MaxGraph() {
  const maxGraphRef = useRef<Graph>(null)
  const maxGraphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    import('@maxgraph/core').then(c => {
      const graph = new c.Graph(maxGraphContainerRef.current!)
      maxGraphRef.current = graph
    })
  }, [])

  return <div ref={maxGraphContainerRef} className={maxGraphClassName}></div>
}
