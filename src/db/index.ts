import { drizzle } from 'drizzle-orm/libsql'
import { vars } from 'src/vars'

export const db = () => drizzle(vars.dbURL)
