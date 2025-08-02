import { db } from '@vec/db'
import * as schema from '@vec/db/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { bearer } from 'better-auth/plugins'
import { vars } from './vars'

export const auth = betterAuth({
  secret: vars.betterAuthSecret,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema
  }),
  plugins: [bearer()]
})
