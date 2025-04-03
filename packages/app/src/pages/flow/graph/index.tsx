import { Suspense, use, useEffect, useRef } from 'react'
import { graphClassName } from './index.css'

async function loadModule() {
  if (typeof window === 'undefined') return null
  // const module = await import('')
  // return module
}

function GraphComponent(props: { module: ReturnType<typeof loadModule> }) {
  const module = use(props.module)
  const graphContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!module) return
    graphContainerRef.current
  }, [module])

  return <div ref={graphContainerRef} className={graphClassName}></div>
}

function GraphSuepense() {
  const module = loadModule()
  return (
    <Suspense>
      <GraphComponent module={module} />
    </Suspense>
  )
}

export { GraphSuepense as Graph }
