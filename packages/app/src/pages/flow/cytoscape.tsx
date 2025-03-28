import cytoscape from 'cytoscape'
import { useEffect, useRef } from 'react'
import { cytoscapeClassName } from './cytoscape.css'

export default function Cytoscape() {
  const cytoscapeRef = useRef<cytoscape.Core>(null)
  const cytoscapeContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    cytoscapeRef.current = cytoscape({ container: cytoscapeContainerRef.current })
  }, [])

  return <div ref={cytoscapeContainerRef} className={cytoscapeClassName}></div>
}
