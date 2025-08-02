import z from 'zod'

const envSchema = z.object({
  BETTER_AUTH_URL: z.url().nonempty(),
  BETTER_AUTH_SECRET: z.string().nonempty()
})

export const env = envSchema.parse(process.env)

export const vars = {
  betterAuthURL: env.BETTER_AUTH_URL,
  betterAuthSecret: env.BETTER_AUTH_SECRET
}
