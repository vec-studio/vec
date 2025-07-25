import z from 'zod'

const envSchema = z.object()

export const env = envSchema.parse(process.env)

export const vars = {}
