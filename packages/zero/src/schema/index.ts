import { createSchema, json, string, table } from '@rocicorp/zero'

const record = table('record').columns({ id: string(), value: json() }).primaryKey('id')

export const schema = createSchema({
  tables: [record]
})

export type Schema = typeof schema
