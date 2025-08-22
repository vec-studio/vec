import { createServerFn } from '@tanstack/react-start'
import { db } from 'src/db'
import { flow } from 'src/db/schema/flow'
import { flowSchema } from 'src/schema'

export const list = createServerFn().handler(async () => {
  const result = await db.select().from(flow)
  return result
})

export const add = createServerFn({method: 'POST'}).validator(flowSchema.pick({})).handler(async ({data}) => {
  const result = await db.insert(flow).values(data).returning().get()
  return result
})
