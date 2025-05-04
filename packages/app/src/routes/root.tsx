import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { getMessages, resolveLocale } from 'src/locale'
import { contextMiddleware } from 'src/middleware'
import { IntlProvider } from 'use-intl'

const queryClient = new QueryClient()

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

function component() {
  const { locale, messages, timeZone } = Route.useLoaderData()
  const style = `body { margin: 0; }`

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
        <style>{style}</style>
      </head>
      <body>
        <IntlProvider locale={locale} messages={messages} timeZone={timeZone}>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </IntlProvider>
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        title: ''
      }
    ]
  }),
  async loader() {
    return await initLocale()
  },
  component
})
