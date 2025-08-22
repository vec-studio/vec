import { type NodeBase } from '@xyflow/system'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const flowNode = sqliteTable('flow_node', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  data: text('data', { mode: 'json' }).$type<NodeBase<any>>(),
  flowId: text('flow_id')
    .notNull()
})
