import z from 'zod'

const envSchema = z.object({
  ZERO_URL: z.url()
})

export const env = envSchema.parse(process.env)

export const vars = { zeroURL: env.ZERO_URL }
