import { Button, SpectrumButtonProps, Link as SpectrumLink, type SpectrumLinkProps } from '@adobe/react-spectrum'
import { createLink } from '@tanstack/react-router'
import { type HTMLAttributes } from 'react'

interface CustomLinkProps extends SpectrumLinkProps {
  className?: HTMLAttributes<unknown>['className']
}

function CustomLink(props: CustomLinkProps) {
  const { className, ...rest } = props
  return <SpectrumLink {...rest} UNSAFE_className={className} />
}

interface CustomButtonLinkProps extends SpectrumButtonProps {
  className?: HTMLAttributes<unknown>['className']
}

function CustomButtonLink(props: CustomButtonLinkProps) {
  const { className, ...rest } = props
  return <Button {...rest} UNSAFE_className={className} />
}

export const Link = createLink(CustomLink)
export const ButtonLink = createLink(CustomButtonLink)
