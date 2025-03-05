import { createFileRoute } from '@tanstack/react-router'
import * as classNames from './index.css'

export const Route = createFileRoute('/')({
  component() {
    return <div className={classNames.root}></div>
  }
})
