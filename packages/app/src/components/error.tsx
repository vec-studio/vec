import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
  type ErrorComponentProps
} from '@tanstack/react-router'
import consola from 'consola'
import { type FunctionComponent } from 'react'

const CustomErrorComponent: FunctionComponent<ErrorComponentProps> = props => {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId
  })

  consola.error(props.error)

  return (
    <div>
      <ErrorComponent error={props.error} />
      <p>
        <button
          onClick={() => {
            router.invalidate()
          }}
        >
          Try Again
        </button>
        {isRoot ? (
          <Link to="/">Home</Link>
        ) : (
          <Link
            to="/"
            onClick={e => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </p>
    </div>
  )
}

export { CustomErrorComponent as ErrorComponent }
