import z from 'zod'

const envSchema = z.object({
  DB_URL: z.string().nonempty().default(':memory:')
})

export const env = envSchema.parse(import.meta.env)

export const vars = { dbURL: env.DB_URL }
