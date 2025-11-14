import { useQuery } from '@tanstack/react-query'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { type PropsWithChildren } from 'react'
import { getMessages, resolveLocale } from 'src/locale'
import { contextMiddleware } from 'src/middleware'
import { IntlProvider } from 'use-intl'

const serverInitLocale = createServerFn()
  .middleware([contextMiddleware])
  .handler(async ctx => {
    const locale = await resolveLocale()
    const messages = await getMessages({ data: locale })
    const timeZone = 'UTC'

    setCookie('lng', locale, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    })

    return { locale, messages, timeZone }
  })

export function WithIntl(props: PropsWithChildren) {
  const initLocale = useServerFn(serverInitLocale)
  const query = useQuery({ queryKey: ['initLocale'], queryFn: () => initLocale() })

  if (query.isError) return null
  if (query.isPending) return null
  return <IntlProvider {...query.data}>{props.children}</IntlProvider>
}
