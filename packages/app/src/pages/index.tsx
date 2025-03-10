import { createFileRoute } from '@tanstack/react-router'
import { indexClassName } from './index.css'

export const Route = createFileRoute('/_layout/')({
  component() {
    return <div className={indexClassName}></div>
  }
})
