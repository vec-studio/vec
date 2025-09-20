import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { WithIntl } from 'src/components/with-intl'
import { WithQuery } from 'src/components/with-query'
import style from './root.css?url'

function component() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <WithQuery>
          <WithIntl>
            <Outlet />
          </WithIntl>
        </WithQuery>
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
    ],
    links: [{ rel: 'stylesheet', href: style }]
  }),
  async loader() {},
  shellComponent: component
})
