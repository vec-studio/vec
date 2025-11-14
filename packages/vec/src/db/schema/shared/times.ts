import { integer } from 'drizzle-orm/sqlite-core'

export const times = {
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => new Date())
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).$onUpdate(() => new Date())
}
