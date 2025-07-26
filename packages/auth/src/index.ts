import { db } from '@vec/db'
import * as schema from '@vec/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { createAuthMiddleware, jwt } from 'better-auth/plugins'
import { setCookies } from './cookie'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  plugins: [
    jwt({
      jwt: {
        // This is now long your websockets will be able to stay up. When the
        // websocket is closed, all the queries are dematerialized on the
        // server. So making the socket lifetime too short is bad for
        // performance.
        //
        // The Zero team is working on some improvements to auth that will
        // enable shorter-lived tokens.
        expirationTime: '1h'
      }
    })
  ],
  hooks: {
    // We set the JWT, email, and userid in cookies to avoid needing an extra
    // round-trip to get them on startup.
    after: createAuthMiddleware(async ctx => {
      if (ctx.path.indexOf('/callback/') !== -1) {
        const headers = ctx.context.responseHeaders!
        const setCookieHeader = ctx.context.responseHeaders?.get('set-cookie')
        const cookieVal = setCookieHeader?.split(';')[0]

        const session = await auth.api.getSession({
          headers: new Headers({
            cookie: cookieVal ?? ''
          })
        })
        const token = await auth.api.getToken({
          headers: new Headers({
            cookie: cookieVal ?? ''
          })
        })

        if (session && token) {
          setCookies(headers, {
            userid: session.user.id,
            email: session.user.email,
            jwt: token.token
          })
        }
        return
      }

      if (ctx.path.indexOf('/sign-out') !== -1) {
        const headers = ctx.context.responseHeaders!
        setCookies(headers, {
          userid: '',
          email: '',
          jwt: ''
        })
        return
      }
    })
  }
})
