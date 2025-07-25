import { type Zero } from '@rocicorp/zero'
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { type Mutators } from '@vec/zero/mutators'
import { type Schema } from '@vec/zero/schema'
import { WithIntl } from 'src/components/with-intl'
import { WithQuery } from 'src/components/with-query'
import { WithSession } from 'src/components/with-session'
import { WithZero } from 'src/components/with-zero'
import { type SessionContextType } from '../components/with-session'

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
        <WithSession>
          <WithIntl>
            <WithQuery>
              <WithZero>
                <Outlet />
              </WithZero>
            </WithQuery>
          </WithIntl>
        </WithSession>
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
