import { View } from '@adobe/react-spectrum'
import { type DOMRefValue } from '@react-types/shared'
import { Suspense, use, useEffect, useRef } from 'react'

async function loadModule() {
  if (typeof window === 'undefined') return null
  // const module = await import('')
  // return module
}

function GraphComponent(props: { module: ReturnType<typeof loadModule> }) {
  const module = use(props.module)
  const containerRef = useRef<DOMRefValue<HTMLElement>>(null)
  // const graphRef = useRef<Graph>(null)

  useEffect(() => {
    if (!module) return
    const el = containerRef.current!.UNSAFE_getDOMNode()!
    // const { Graph } = module
    // graphRef.current = new Graph(el)
  }, [module])

  return <View ref={containerRef}></View>
}

function GraphComponentSuspense() {
  const module = loadModule()
  return (
    <Suspense>
      <GraphComponent module={module} />
    </Suspense>
  )
}

export { GraphComponentSuspense as Graph }
