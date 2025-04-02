import { Graph } from '@maxgraph/core'
import { useEffect, useRef } from 'react'
import { maxGraphClassName } from './max-graph.css'

export default function MaxGraph() {
  const maxGraphRef = useRef<Graph>(null)
  const maxGraphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    maxGraphRef.current = new Graph(maxGraphContainerRef.current!)
  }, [])

  return <div ref={maxGraphContainerRef} className={maxGraphClassName}></div>
}
