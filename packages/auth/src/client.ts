import { createAuthClient } from 'better-auth/react'
import { vars } from './vars'

export const authClient = createAuthClient({
  baseURL: vars.betterAuthURL
})
