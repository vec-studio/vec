import { Link } from '@tanstack/react-router'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NotFoundComponent: FunctionComponent<PropsWithChildren> = props => {
  return (
    <div>
      <h1>404 Not Found</h1>
      {props.children || (
        <p>
          <button onClick={() => window.history.back()}>Go Back</button>
          <Link to="/">Start Over</Link>
        </p>
      )}
    </div>
  )
}
