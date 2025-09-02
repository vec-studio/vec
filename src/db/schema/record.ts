import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { times } from './shared/times'

export const record = sqliteTable('record', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  //
  ...times,
  //
  value: text('value', { mode: 'json' })
})
