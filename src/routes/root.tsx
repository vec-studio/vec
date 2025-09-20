import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { WithIntl } from 'src/components/with-intl'
import { WithQuery } from 'src/components/with-query'

function component() {
  const style = `body { margin: 0; }`

  return (
    <html>
      <head>
        <HeadContent />
        <style>{style}</style>
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
    ]
  }),
  async loader() {},
  shellComponent: component
})
