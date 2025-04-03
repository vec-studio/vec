import { Suspense, use, useEffect, useRef } from 'react'
import { graphClassName } from './index.css'

async function loadCytoscape() {
  if (typeof window === 'undefined') return null
  const cytoscape = (await import('cytoscape')).default
  return cytoscape
}

function CytoscapeComponent(props: { promise: ReturnType<typeof loadCytoscape> }) {
  const cytoscape = use(props.promise)
  const graphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cytoscape) return
    cytoscape({ container: graphContainerRef.current })
  }, [cytoscape])

  return <div ref={graphContainerRef} className={graphClassName}></div>
}

function CytoscapeSuspense() {
  const cytoscape = loadCytoscape()
  return (
    <Suspense>
      <CytoscapeComponent promise={cytoscape} />
    </Suspense>
  )
}

export { CytoscapeSuspense as Graph }
