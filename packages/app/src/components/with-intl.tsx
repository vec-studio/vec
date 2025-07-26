import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { PropsWithChildren } from 'react'
import { getMessages, resolveLocale } from 'src/locale'
import { contextMiddleware } from 'src/middleware'
import { IntlProvider } from 'use-intl'

const initLocale = createServerFn()
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

export async function WithIntl(props: PropsWithChildren) {
  const { locale, messages, timeZone } = await initLocale()

  return (
    <IntlProvider locale={locale} messages={messages} timeZone={timeZone}>
      {props.children}
    </IntlProvider>
  )
}
