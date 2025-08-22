import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const flow = sqliteTable('flow', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid())
})
