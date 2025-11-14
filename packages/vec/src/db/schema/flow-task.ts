import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { times } from './shared/times'

export const flowTask = sqliteTable('flow_node', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  flowId: text('flow_id').notNull(),
  flowNodeId: text('flow_node_id').notNull(),
  //
  ...times,
  //
  data: text('data').notNull()
})
