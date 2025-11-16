import { drizzle } from 'drizzle-orm/libsql'
import { vars } from '../vars'

export const db = drizzle(vars.dbURL)
