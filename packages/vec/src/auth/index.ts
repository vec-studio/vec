import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { bearer } from 'better-auth/plugins'
import { db } from '~/src/db'
import * as schema from '~/src/db/schema'
import { vars } from '~/src/vars'

export const auth = betterAuth({
  secret: vars.betterAuthSecret,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema
  }),
  plugins: [bearer()]
})
