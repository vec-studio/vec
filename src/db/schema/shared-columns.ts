import { integer } from 'drizzle-orm/sqlite-core'

export const times = {
  createdAt: integer().$default(() => Date.now()).notNull(),
  updatedAt: integer().$onUpdate(() => Date.now()),
  deletedAt: integer()
}
