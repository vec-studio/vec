import { Button, Item, Link as SpectrumLink } from '@adobe/react-spectrum'
import { createLink } from '@tanstack/react-router'

export const Link = createLink(SpectrumLink)
export const ItemLink = createLink(Item)
export const ButtonLink = createLink(Button)
