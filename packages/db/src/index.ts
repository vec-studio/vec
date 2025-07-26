import { drizzle } from 'drizzle-orm/postgres-js'
import { vars } from './vars'

export const db = drizzle(vars.pgURL)
