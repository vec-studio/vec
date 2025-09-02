import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import { db } from 'src/db'
import { flow } from 'src/db/schema/flow'
import { flowSchema } from 'src/schema'

export const listFlowServerFn = createServerFn()
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

export const addFlowServerFn = createServerFn({ method: 'POST' })
  .validator(flowSchema.pick({ id: true }))
  .handler(async ({ data }) => {
    const result = await db.insert(flow).values(data).returning().get()
    return result
  })
