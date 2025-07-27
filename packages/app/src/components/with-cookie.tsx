import { CookiesProvider } from 'react-cookie'
import { type PropsWithChildren } from 'react'

export function WithCookie(props: PropsWithChildren) {
  return <CookiesProvider>{props.children}</CookiesProvider>
}
