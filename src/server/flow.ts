import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from 'src/db'
import { flow } from 'src/db/schema/flow'
import { flowSchema } from 'src/schema'

export const list = createServerFn()
  .validator(flowSchema.pick({ id: true }).optional())
  .handler(async ({ data }) => {
    let where

    if (data?.id) {
      const x = eq(flow.id, data.id)
      where = where ? and(where, x) : x
    }

    const result = await db.select().from(flow)

    return result
  })

export const add = createServerFn({ method: 'POST' })
  .validator(flowSchema)
  .handler(async ({ data }) => {
    const result = await db.insert(flow).values(data).returning().get()
    return result
  })
