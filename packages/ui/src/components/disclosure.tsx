import { Disclosure as RACDisclosure, DisclosureProps as RACDisclosureProps } from 'react-aria-components'
import { Button } from './button'
import { DisclosurePanel } from './disclosure-panel'
import { Heading } from './heading'

export interface DisclosureProps extends Omit<RACDisclosureProps, 'children'> {
  title?: string
  children?: React.ReactNode
}

export function Disclosure({ title, children, ...props }: DisclosureProps) {
  return (
    <RACDisclosure {...props}>
      <Heading>
        <Button slot="trigger">
          <svg viewBox="0 0 24 24">
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          {title}
        </Button>
      </Heading>
      <DisclosurePanel>
        <p>{children}</p>
      </DisclosurePanel>
    </RACDisclosure>
  )
}
