import { createAuthClient } from 'better-auth/react'
import { vars } from 'src/vars'

export const authClient = createAuthClient({
  baseURL: vars.betterAuthURL
})
