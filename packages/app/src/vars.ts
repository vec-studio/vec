import { config } from 'dotenv'
config({ override: true })

import z from 'zod'

const envSchema = z.object({
  CONSOLA_LEVEL: z.string(),
  BETTER_AUTH_URL: z.url().nonempty(),
  BETTER_AUTH_SECRET: z.string().nonempty()
})

export const env = envSchema.parse(import.meta.env)

export const vars = {
  consolaLevel: env.CONSOLA_LEVEL,
  betterAuthURL: env.BETTER_AUTH_URL,
  betterAuthSecret: env.BETTER_AUTH_SECRET
}
