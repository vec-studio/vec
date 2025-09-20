import { useRouter } from '@tanstack/react-router'
import { type FunctionComponent, type PropsWithChildren } from 'react'
import { Button, Heading } from 'react-aria-components'
import { ButtonLink } from './link'

export const NotFoundComponent: FunctionComponent<PropsWithChildren> = props => {
  const router = useRouter()

  return (
    <div>
      <Heading>404 Not Found</Heading>
      {props.children || (
        <div>
          <Button onPress={() => router.history.back()}>Go Back</Button>
          <ButtonLink to="/">Start Over</ButtonLink>
        </div>
      )}
    </div>
  )
}
