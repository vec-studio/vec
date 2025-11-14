import { type EdgeBase } from '@xyflow/system'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'
import { times } from './shared/times'

export const flowEdge = sqliteTable('flow_edge', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  flowId: text('flow_id').notNull(),
  //
  ...times,
  //
  data: text('data', { mode: 'json' }).$type<EdgeBase<any>>().notNull()
})
