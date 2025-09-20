import { ErrorComponent, rootRouteId, useMatch, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import consola from 'consola'
import { type FunctionComponent } from 'react'
import { Button } from 'react-aria-components'
import { ButtonLink } from './link'

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
      <div>
        <Button onPress={() => router.invalidate()}>Try Again</Button>
        {isRoot ? <ButtonLink to="/">Home</ButtonLink> : <Button onPress={() => router.history.back()}>Go Back</Button>}
      </div>
    </div>
  )
}

export { CustomErrorComponent as ErrorComponent }
