import clsx from 'clsx'
import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { semanticClassName, themeLightClassName } from '../theme.css'
import { Components } from './components'
import { previewClassName } from './index.css'

function Root() {
  const [themeClassName] = useState(themeLightClassName)
  const bodyClassNames = useMemo(() => [themeClassName, semanticClassName], [themeClassName])

  useEffect(() => {
    document.body.classList.add(...bodyClassNames)

    return () => {
      document.body.classList.remove(...bodyClassNames)
    }
  }, [bodyClassNames])

  return (
    <div className={clsx(bodyClassNames)}>
      <div className={previewClassName}>
        <Components />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
