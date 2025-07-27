import z from 'zod'

const envSchema = z.object({
  VITE_CONSOLA_LEVEL: z.string(),
  VITE_ZERO_URL: z.url()
})

export const env = envSchema.parse(import.meta.env)

export const vars = { consolaLevel: env.VITE_CONSOLA_LEVEL, zeroURL: env.VITE_ZERO_URL }
