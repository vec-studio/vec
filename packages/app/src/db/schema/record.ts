import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const record = sqliteTable('record', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  value: text('value', { mode: 'json' })
})
