import { Button, Content, View } from '@adobe/react-spectrum'
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
import { ButtonLink } from './link'

const CustomErrorComponent: FunctionComponent<ErrorComponentProps> = props => {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId
  })

  consola.error(props.error)

  return (
    <View>
      <ErrorComponent error={props.error} />
      <Content>
        <Button variant="secondary" onPress={() => router.invalidate()}>
          Try Again
        </Button>
        {isRoot ? (
          <ButtonLink variant="secondary" to="/">
            Home
          </ButtonLink>
        ) : (
          <Button variant="secondary" onPress={() => router.history.back()}>
            Go Back
          </Button>
        )}
      </Content>
    </View>
  )
}

export { CustomErrorComponent as ErrorComponent }
