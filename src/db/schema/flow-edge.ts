import { type EdgeBase } from '@xyflow/system'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const flowEdge = sqliteTable('flow_edge', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  data: text('data', { mode: 'json' }).$type<EdgeBase<any>>(),
  flowId: text('flow_id')
    .notNull()
})
