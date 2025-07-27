import { type Zero } from '@rocicorp/zero'
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { type Mutators } from '@vec/zero/mutators'
import { type Schema } from '@vec/zero/schema'
import { WithCookie } from 'src/components/with-cookie'
import { WithIntl } from 'src/components/with-intl'
import { WithQuery } from 'src/components/with-query'
import { WithSession, type SessionContextType } from 'src/components/with-session'
import { WithZero } from 'src/components/with-zero'

export interface RouterContext {
  zero: Zero<Schema, Mutators>
  session: SessionContextType
}

function component() {
  const style = `body { margin: 0; }`

  return (
    <html>
      <head>
        <HeadContent />
        <style>{style}</style>
      </head>
      <body>
        <WithCookie>
          <WithSession>
            <WithQuery>
              <WithIntl>
                <WithZero>
                  <Outlet />
                </WithZero>
              </WithIntl>
            </WithQuery>
          </WithSession>
        </WithCookie>
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
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
  component
})
