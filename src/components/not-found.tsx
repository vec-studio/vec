import { Content, Heading, View } from '@adobe/react-spectrum'
import { useRouter } from '@tanstack/react-router'
import { type FunctionComponent, type PropsWithChildren } from 'react'
import { Button } from 'react-aria-components'
import { ButtonLink } from './link'

export const NotFoundComponent: FunctionComponent<PropsWithChildren> = props => {
  const router = useRouter()

  return (
    <View>
      <Heading>404 Not Found</Heading>
      {props.children || (
        <Content>
          <Button onClick={() => router.history.back()}>Go Back</Button>
          <ButtonLink to="/" variant="accent">
            Start Over
          </ButtonLink>
        </Content>
      )}
    </View>
  )
}
