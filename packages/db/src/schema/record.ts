import { json, pgTable, text } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const record = pgTable('record', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  value: json('value')
})
