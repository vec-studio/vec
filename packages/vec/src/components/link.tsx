import { createLink } from '@tanstack/react-router'
import { Button as RACButton, Link as RACLink } from 'react-aria-components'

export const Link = createLink(RACLink)
export const ButtonLink = createLink(RACButton)
