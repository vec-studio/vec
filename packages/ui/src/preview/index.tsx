import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { semanticClassName, themeLightClassName } from '../theme.css'
import { Components } from './components'
import { previewClassName } from './index.css'

function Root() {
  return (
    <div className={`${themeLightClassName} ${semanticClassName}`}>
      <div className={`${previewClassName}`}>
        <Components />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
