import z from 'zod'

const envSchema = z.object({
  PG_URL: z.url()
})

export const env = envSchema.parse(process.env)

export const vars = { pgURL: env.PG_URL }
